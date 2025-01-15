import React from 'react';

// Icons as pure SVG components
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// Status badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Approved: 'bg-[#e6f5ee] border-[#069855] text-[#069855]',
    DisApproved: 'bg-[#f5e6e6] border-[#d62525] text-[#d62525]',
    Pending: 'bg-[#f5efe6] border-[#ffae00] text-[#ffae00]'
  };

  return (
    <div className={`px-3 py-1 rounded-lg border flex items-center justify-center ${statusStyles[status]}`}>
      <div className="text-2xl font-light">{status}</div>
    </div>
  );
};

// Stats card component
const StatsCard = ({ icon: Icon, title, value }) => (
  <div className="p-6 bg-white rounded-xl border border-black/20 flex justify-between items-center">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 p-2.5 rounded-lg border border-black/20 flex justify-center items-center">
        <Icon />
      </div>
      <div className="text-black text-base font-light leading-tight">{title}</div>
    </div>
    <div className="text-black text-5xl font-medium leading-10">{value}</div>
  </div>
);

// Table header component
const TableHeader = ({ title }) => (
  <div className="px-6 py-[22px] bg-neutral-100 rounded-lg shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border-l-2 flex-1">
    <div className="text-[#5c606a] text-2xl font-medium leading-normal">{title}</div>
  </div>
);

// Main dashboard component
const LeaveDashboard = () => {
  const leaveData = [
    { fromDate: '13/01/2024', toDate: '18/01/2024', days: 5, type: 'CL', reason: 'This is for testing.', status: 'Approved' },
    { fromDate: '13/01/2024', toDate: '18/01/2024', days: 5, type: 'EL', reason: 'This is for testing.', status: 'DisApproved' },
    { fromDate: '13/01/2024', toDate: '18/01/2024', days: 5, type: 'CL', reason: 'This is for testing.', status: 'Pending' },
    { fromDate: '13/01/2024', toDate: '18/01/2024', days: 5, type: 'CL', reason: 'This is for testing.', status: 'DisApproved' },
    { fromDate: '13/01/2024', toDate: '18/01/2024', days: 5, type: 'EL', reason: 'This is for testing.', status: 'Approved' }
  ];

  return (
    <div className="w-full px-16 pt-16 bg-white rounded-2xl flex flex-col gap-14">
      {/* Header Section */}
      <div className="border-b border-black/20 pb-16 space-y-12">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[#5c606a] text-2xl font-medium">Welcome back, </span>
            <span className="text-[#534feb] text-2xl font-medium">Aditya</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-[#848892] text-2xl font-medium">Tue,</div>
            <div>
              <span className="text-[#848892] text-2xl font-medium">00:00:00 </span>
              <span className="text-[#534feb] text-2xl font-medium">AM</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="h-14 px-6 py-4 rounded-xl shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border border-black/20 flex items-center gap-3">
              <SearchIcon />
              <input 
                type="text" 
                placeholder="Search by Date, Time, Status..."
                className="bg-transparent text-black/40 text-base font-light outline-none flex-1"
              />
            </div>
          </div>
          <button className="h-14 px-6 py-4 rounded-xl shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border border-black/20 flex items-center gap-3">
            <span className="text-black text-base font-light">Date</span>
            <CalendarIcon />
          </button>
          <button className="h-14 px-6 py-4 rounded-xl shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border border-black/20 flex items-center gap-3">
            <CalendarIcon />
            <span className="text-black text-base font-light">13 Jan, 2024</span>
          </button>
          <button className="h-14 px-6 py-4 rounded-xl shadow-[4px_4px_40px_-5px_rgba(0,0,0,0.05)] border border-black/20 flex items-center gap-3">
            <span className="text-black text-base font-light">Export CSV</span>
            <DownloadIcon />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-6">
          <StatsCard icon={CalendarIcon} title="Total Casual Leaves" value="150" />
          <StatsCard icon={CalendarIcon} title="Total Earn Leaves" value="4" />
        </div>
      </div>

      {/* Leave Applications Section */}
      <div className="space-y-6 pb-16">
        <h2 className="text-[#5c606a] text-2xl font-medium">Last Applied</h2>
        
        {/* Table */}
        <div className="space-y-3">
          {/* Table Headers */}
          <div className="flex gap-2">
            {['From Date', 'To Date', 'No. of Days', 'Leave Type', 'Reason', 'Status'].map((title) => (
              <TableHeader key={title} title={title} />
            ))}
          </div>

          {/* Table Rows */}
          {leaveData.map((leave, index) => (
            <div key={index} className="border-b border-black/20">
              <div className="flex gap-2">
                <div className="flex-1 p-4"><div className="text-black text-2xl font-light">{leave.fromDate}</div></div>
                <div className="flex-1 p-4"><div className="text-black text-2xl font-light">{leave.toDate}</div></div>
                <div className="flex-1 p-4"><div className="text-black text-2xl font-light">{leave.days}</div></div>
                <div className="flex-1 p-4"><div className="text-black text-2xl font-light">{leave.type}</div></div>
                <div className="flex-1 p-4"><div className="text-black text-2xl font-light">{leave.reason}</div></div>
                <div className="flex-1 p-4">
                  <StatusBadge status={leave.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveDashboard;