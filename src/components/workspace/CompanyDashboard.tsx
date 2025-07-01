import React from 'react';
import { BarChart, Users, FileText, Clock, Calendar, Target } from 'lucide-react';

export function CompanyDashboard() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Stats Cards */}
        <StatCard 
          icon={<Users className="h-6 w-6" />} 
          title="Team Members" 
          value="5" 
          change="+1" 
          isPositive={true} 
        />
        
        <StatCard 
          icon={<FileText className="h-6 w-6" />} 
          title="Active Projects" 
          value="3" 
          change="-1" 
          isPositive={false} 
        />
        
        <StatCard 
          icon={<Clock className="h-6 w-6" />} 
          title="Hours Tracked" 
          value="128" 
          change="+12" 
          isPositive={true} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark/30 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <button className="text-sm text-theme-primary hover:underline">View All</button>
          </div>
          
          {/* Activity List */}
          <div className="space-y-4">
            <ActivityItem 
              icon={<FileText className="h-4 w-4" />} 
              title="Design Review Document Updated" 
              time="2 hours ago"
              user="Sarah Johnson" 
            />
            
            <ActivityItem 
              icon={<Users className="h-4 w-4" />} 
              title="New Team Member Added" 
              time="Yesterday"
              user="Admin" 
            />
            
            <ActivityItem 
              icon={<Target className="h-4 w-4" />} 
              title="Project Milestone Completed" 
              time="2 days ago"
              user="Dev Team" 
            />
          </div>
        </div>
        
        <div className="bg-dark/30 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upcoming Events</h3>
            <button className="text-sm text-theme-primary hover:underline">View Calendar</button>
          </div>
          
          {/* Events List */}
          <div className="space-y-4">
            <EventItem 
              title="Weekly Team Meeting" 
              date="Tomorrow, 10:00 AM" 
              attendees={4} 
            />
            
            <EventItem 
              title="Project Review" 
              date="Jun 18, 2:30 PM" 
              attendees={6} 
            />
            
            <EventItem 
              title="Client Presentation" 
              date="Jun 24, 11:00 AM" 
              attendees={3} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change, isPositive }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
  change: string;
  isPositive: boolean;
}) {
  return (
    <div className="bg-dark/30 border border-white/10 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/60">{title}</span>
        <span className="bg-white/10 p-2 rounded-full">{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-sm ${isPositive ? 'text-theme-emerald' : 'text-theme-red'}`}>
          {change}
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, time, user }: {
  icon: React.ReactNode;
  title: string;
  time: string;
  user: string;
}) {
  return (
    <div className="flex items-start">
      <div className="bg-white/10 p-2 rounded-full mr-3">
        {icon}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-white/60">
          {time} • {user}
        </div>
      </div>
    </div>
  );
}

function EventItem({ title, date, attendees }: {
  title: string;
  date: string;
  attendees: number;
}) {
  return (
    <div className="flex items-start">
      <div className="bg-theme-primary/20 p-2 rounded-lg mr-3 text-theme-primary">
        <Calendar className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-white/60">{date}</div>
      </div>
      <div className="bg-white/10 text-xs px-2 py-1 rounded-full">
        {attendees} attendees
      </div>
    </div>
  );
} 