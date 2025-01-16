import { API_BASE_URL, ACCESS_TOKEN } from "./Constant";
import request from "./ApiConnector";

export function getCurrentUser() {
  console.log("inside the getCurrentUser");

  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("inside the getCurrentUser");
  return request({
    url: API_BASE_URL + "/api/users/user/me",
    method: "GET",
  });
}
export const verifyOtp = async (email, otp) => {
  console.log("email,otp", email);
  console.log("email,otp", otp);

  const response = await fetch(
    `${API_BASE_URL}/auth/verify-otp?email=${email}&otp=${otp}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to verify OTP");
  }

  return response.json();
};
export function getPrivateMessage() {
  console.log("getPrivateMessage");
  return request({
    url: API_BASE_URL + "/prii",
    method: "GET",
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function getUserProfile() {
  return request({
    url: API_BASE_URL + "/api/user-profile/24",
    method: "GET",
  });
}
export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}
export function signupForm(signupRequestForm) {
  const userData = localStorage.getItem("userData"); // Retrieve the userData string from localStorage
  const parsedUserData = JSON.parse(userData); // Parse the string into an object

  if (!parsedUserData || !parsedUserData.id) {
    console.error("User ID is missing in localStorage");
    return; // Optionally handle the error
  }

  console.log(parsedUserData); // You can log the parsed object to inspect its contents

  // Use template literals to correctly insert the userId from parsedUserData
  return request({
    url: `${API_BASE_URL}/employee/add?userId=${parsedUserData.id}`, // Correctly inserting userId
    method: "POST",
    body: JSON.stringify(signupRequestForm), // The formData will be sent here
  });
}

export function getAllUsers() {
  return request({
    // url: API_BASE_URL + "/admin/getAllUsers",
    url: API_BASE_URL + "/api/users/allUsers",

    method: "GET",
  });
}

export function getAllRoles() {
  console.log("getAllRoles");
  return request({
    url: API_BASE_URL + "/admin/getAllRoles",
    method: "GET",
  });
}

export function updateUserRoleAndStatus(userId, newRoles, newStatus) {
  const body = {};
  if (newRoles !== null) body.roles = newRoles; // newRoles should be an array
  if (newStatus !== null) body.status = newStatus;

  console.log("body inside updateUserRoleAndStatus", body);

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  // Add the Authorization token if available
  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  // Send the PUT request to the backend
  return fetch(`${API_BASE_URL}/admin/users/${userId}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body),
  }).then((response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      });
    } else {
      return response.text().then((text) => {
        if (!response.ok) {
          return Promise.reject(text);
        }
        return text;
      });
    }
  });
}

export function getAllEmployee() {
  console.log("getAllEmployee");
  return request({
    url: API_BASE_URL + "/employee/all",
    method: "GET",
  });
}

export function updateEmployee(employeeId, employeeDetail) {
  try {
    // Replace the fetch call with the request API connector
    console.log("updateEmployee", employeeId);
    const response = request({
      url: `${API_BASE_URL}/employee/update/${employeeId}`,
      method: "PUT",
      body: JSON.stringify(employeeDetail), // Convert data to JSON
    });

    console.log("Employee updated successfully");
    return response;
  } catch (error) {
    console.error("Failed to update employee:", error);
    return Promise.reject(error);
  }
}

export function getReimbursements() {
  return request({
    url: `${API_BASE_URL}/api/reimbursements/admin/files`,
    method: "GET",
  });
}

export async function getAllTicket() {
  return request({
    url: `${API_BASE_URL}/api/tickets/all`,
    method: "GET",
  });
}

export async function createReimbursement(reimbursementData) {
  const formData = new FormData();
  formData.append("category", reimbursementData.category);
  formData.append("description", reimbursementData.description);
  formData.append("userId", reimbursementData.userId);

  if (reimbursementData.file) {
    formData.append("file", reimbursementData.file);
  }

  const headers = new Headers();

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const options = {
    method: "POST",
    body: formData,
    headers: headers,
  };

  try {
    const response = await request({
      url: `http://192.168.0.132:8080/api/reimbursements/create`,
      ...options,
    });

    return response;
  } catch (error) {
    console.error("Error creating reimbursement:", error);
    throw error;
  }
}

export function getTickets(userId) {
  return request({
    url: `${API_BASE_URL}/api/tickets/user/${userId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });
}

export async function createTicket(ticketData) {
  console.log("createTicket", ticketData);
  const formData = new FormData();

  formData.append("title", ticketData.title);
  formData.append("description", ticketData.description);
  formData.append("userId", ticketData.userId);

  const headers = new Headers();

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const options = {
    method: "POST",
    body: formData,
    headers: headers,
  };

  try {
    const response = await request({
      url: `http://192.168.0.132:8080/api/tickets/create`,
      ...options,
    });

    return response;
  } catch (error) {
    console.error("Error creating reimbursement:", error);
    throw error;
  }
}
export const applyLeaveAPI = (leaveDetails) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const requestBody = JSON.stringify(leaveDetails);

  return fetch(`http://192.168.0.132:8080/api/leaves/apply-leave`, {
    method: "POST",
    headers: headers,
    body: requestBody,
  })
    .then((response) => {
      console.log("response", response);
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        return response.text();
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error applying leave:", error);
      throw error;
    });
};

export async function getLeaves(userId) {
  console.log("Fetching leaves for user:", userId);

  return request({
    url: `http://192.168.0.132:8080/api/leaves/my-leaves/${userId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  })
    .then((response) => {
      console.log("Leaves fetched successfully:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error fetching leaves:", error);
      throw error;
    });
}

export const clockInAPI = async (userId) => {
  try {
    const response = await request({
      url: `http://192.168.0.132:8080/api/clockings/clock-in/${userId}`,
      method: "POST",
    });
    return response;
  } catch (error) {
    console.error("Clock-In API Error:", error);
    throw new Error(error?.message || "Failed to clock in.");
  }
};

export const clockOutAPI = async (clockingId) => {
  try {
    const response = await request({
      url: `http://192.168.0.132:8080/api/clockings/clock-out/${clockingId}`,
      method: "POST",
    });
    return response;
  } catch (error) {
    console.error("Clock-Out API Error:", error);
    throw new Error(error?.message || "Failed to clock out.");
  }
};

/**
 * Get a list of all events.
 */
export function getAllEvents() {
  return request({
    url: `${API_BASE_URL}/api/events`,
    method: "GET",
  });
}
export async function getAllLeaves() {
  return request({
    url: `${API_BASE_URL}/api/leaves/all`,
    method: "GET",
  });
}
/**
 * Create a new event.
 * This requires either ADMIN or MANAGER role.
 */
export function createEvent(eventData) {
  return request({
    url: `${API_BASE_URL}/api/events`,
    method: "POST",
    body: JSON.stringify(eventData),
  });
}

/**
 * Delete an event by its ID.
 * This requires either ADMIN or MANAGER role.
 */
export function deleteEvent(id) {
  return request({
    url: `${API_BASE_URL}/api/events/${id}`,
    method: "DELETE",
  });
}

/**
 * Get a single event by its ID.
 */
export function getEventById(id) {
  return request({
    url: `${API_BASE_URL}/api/events/${id}`,
    method: "GET",
  });
}

export function getAttendanceById(id) {
  return request({
    url: `${API_BASE_URL}/api/clockings/${id}`,
    method: "GET",
  });
}

export function getAllAttendance() {
  return request({
    url: `${API_BASE_URL}/api/clockings/all`,
    method: "GET",
  });
}

export function getAllPayroll() {
  return request({
    url: `${API_BASE_URL}/api/payroll`,
    method: "GET",
  });
}

export function updatePayroll(id, payrollData) {
  return request({
    url: `${API_BASE_URL}/api/payroll/${id}`, // The ID of the payroll to be updated
    method: "PUT",
    body: JSON.stringify(payrollData), // Data to be sent in the body of the request
  });
}

export async function getTotalEmployee() {
  return request({
    url: `${API_BASE_URL}/employee/totalEmployees`,
    method: "GET",
  });
}
export async function getTotalAbsentEmployee() {
  return request({
    url: `${API_BASE_URL}/employee/absentEmployees`,
    method: "GET",
  });
}

export async function updateClockingStatus(id, status) {
  const url = new URL(`${API_BASE_URL}/api/clockings/updateStatus/${id}`);
  url.searchParams.append("status", status);

  const options = {
    url: url.toString(),
    method: "PUT",
  };

  try {
    const response = await request(options);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const updateTicketStatus = async (ticketId, status) => {
  console.log("ticketId ", ticketId);
  console.log("status ", status);

  try {
    const response = await request({
      url: `${API_BASE_URL}/api/tickets/update-status?ticketId=${ticketId}&status=${status}`, // Send as query parameters
      method: "POST",
    });

    // Handle the success response
    console.log("Ticket status updated successfully:", response);
    return response;
  } catch (error) {
    // Handle error response
    console.error("Error updating ticket status:", error);
    throw error;
  }
};

export const showCharts = async () => {
  console.log("inside fetchPieData");

  try {
    const response = await request({
      url: `${API_BASE_URL}/user/tasks/completionData/all`, // Send as query parameters
      method: "GET",
    });

    // Handle the success response
    console.log("chart  updated successfully:", response);
    return response;
  } catch (error) {
    // Handle error response
    console.error("Error updating ticket status:", error);
    throw error;
  }
};
export const fetchPieData = async () => {
  console.log("inside fetchPieData");

  try {
    const response = await request({
      url: `${API_BASE_URL}/user/tasks/statusCounts`, // Send as query parameters
      method: "GET",
    });

    // Handle the success response
    console.log("chart  updated successfully:", response);
    return response;
  } catch (error) {
    // Handle error response
    console.error("Error updating ticket status:", error);
    throw error;
  }
};

export const fetchBarData = async (userId) => {
  console.log("inside fetchBarData");

  try {
    const response = await request({
      url: `${API_BASE_URL}/user/tasks/performance/${userId}`, 
      method: "GET",
    });

    // Handle the success response
    console.log("chart  updated successfully:", response);
    return response;
  } catch (error) {
    // Handle error response
    console.error("Error updating ticket status:", error);
    throw error;
  }
};

export const fetchDoughnutData = async (userId) => {
  console.log("inside fetchDoughnutData");

  try {
    const response = await request({
      url: `${API_BASE_URL}/user/tasks/statusCounts/${userId}`, 
      method: "GET",
    });

    // Handle the success response
    console.log("chart  updated successfully:", response);
    return response;
  } catch (error) {
    // Handle error response
    console.error("Error updating ticket status:", error);
    throw error;
  }
};

// export async function createTask(task) {
//   const formData = new FormData();
//   formData.append("taskName", task.taskName); // Corrected taskName
//   formData.append("priority", task.priority); // Corrected from 'description'
//   formData.append("userId", task.userId); // Corrected from 'assignee'
//   formData.append("description", task.taskDescription); // Corrected from 'message'
//   formData.append("dueDate", task.dueDate); // Corrected field name


//   const headers = new Headers();

//   if (localStorage.getItem("ACCESS_TOKEN")) {
//     headers.append(
//       "Authorization",
//       "Bearer " + localStorage.getItem("ACCESS_TOKEN")
//     );
//   }

//   const options = {
//     method: "POST",
//     body: formData,
//     headers: headers,
//   };

//   try {
//     const response = await fetch(
//       "http://localhost:8080/user/tasks/create",
//       options
//     );
//     return await response.json(); // Ensure the response is in JSON format
//   } catch (error) {
//     console.error("Error creating task:", error);
//     throw error;
//   }
// }

export async function createTask(task) {
    console.log("inside createTask", task.taskName);

    // Function to format the date as yyyy-MM-dd'T'HH:mm:ss
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    // Format the dueDate to the required format (yyyy-MM-dd'T'HH:mm:ss)
    const formattedDueDate = formatDate(task.dueDate);

    // Create a new FormData object to send the task data
    const formData = new FormData();
    formData.append("taskName", task.taskName); // Task name
    formData.append("priority", task.priority); // Task priority
    formData.append("userId", task.userId); // User ID (assignee)
    formData.append("messages", task.messages); // Task description
    formData.append("dueDate", formattedDueDate); // Formatted due date

    // Set up request headers
    const headers = new Headers();
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        headers.append("Authorization", `Bearer ${accessToken}`);
    }

    // Log the FormData for debugging purposes
    console.log("formData", formData);

    // Define the request options
    const options = {
        method: "POST", // HTTP method
        body: formData, // The body containing the task data
        headers: headers, // Authorization headers
    };

    try {
        // Make the request to the server
        const response = await request({
            url: `http://localhost:8080/user/tasks/create`,
            ...options, // Spread the options to include method, body, and headers
        });

        // Return the response from the server
        return response;
    } catch (error) {
        // Log the error if request fails
        console.error("Error creating task:", error);
        throw error; // Rethrow the error to handle it elsewhere
    }
}
export const getAllTask = async () => {
  console.log("inside getAllTask");

  try {
    
    const response = await request({
      url: `${API_BASE_URL}/user/tasks/user/2`, // Send as query parameters
      method: "GET",
    });

    // Handle the success response
    console.log("task  updated successfully:", response);
    return response;
  } catch (error) {
    // Handle error response
    console.error("Error updating ticket status:", error);
    throw error;
  }
};


export const updateTaskStatus = async (taskId, status) => {
  console.log("Updating task status...",status);
  console.log("Updating task status... taskId",taskId);
  const formData = new FormData();
  formData.append("status",status); // Task name
  console.log("form data",formData)

  // Set up request headers
  const headers = new Headers();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
  }

  // Log the FormData for debugging purposes
  console.log("formData", formData);

  // Define the request options
  const options = {
      method: "PATCH", // HTTP method
      body: formData, // The body containing the task data
      headers: headers, // Authorization headers
  };

  try {
      // Make the request to the server
      const response = await request({
          url: `http://localhost:8080/user/tasks/update/${taskId}`,
          ...options, // Spread the options to include method, body, and headers
      });

      // Return the response from the server
      return response;
  } catch (error) {
      // Log the error if request fails
      console.error("Error creating task:", error);
      throw error; // Rethrow the error to handle it elsewhere
  }
}


export async function updateLeaveStatus(id, action) {
  console.log("id", id);
  console.log("action", action);

  // Map the boolean action to 'accept' or 'reject'
  const status = action === true ? "accept" : action === false ? "reject" : "pending";

  const url = new URL(`${API_BASE_URL}/api/leaves/manage/${status}/${id}`);
  url.searchParams.append("status", status);

  const options = {
      url: url.toString(),
      method: "PUT",
  };

  try {
      const response = await request(options);
      return response;
  } catch (error) {
      return Promise.reject(error);
  }
}
export  const updateEvent = async (id, eventData) => {
  const options = {
      url: `${API_BASE_URL}/api/events/${id}`,  // The URL to the PUT endpoint with the event ID
      method: 'PUT',             // HTTP method is PUT for updating
      body: JSON.stringify(eventData),  // The event data to update in the request body
  };

  try {
      const updatedEvent = await request(options);  // Call the request function
      return updatedEvent;  // Return the updated event
  } catch (error) {
      console.error("Error updating event:", error);  // Handle error
      throw error;  // Propagate the error
  }}