import React from "react";

interface TimelineEvent {
  title: string;
  date: string;
  category: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => (
  <ol className="relative border-l border-purple-300">
    {events.map((event, idx) => (
      <li key={idx} className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-6 h-6 bg-purple-200 rounded-full -left-3 ring-4 ring-white">
          <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
        </span>
        <h3 className="flex items-center mb-1 text-lg font-semibold text-purple-800">{event.title}</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{new Date(event.date).toLocaleDateString()}</time>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{event.category}</span>
      </li>
    ))}
  </ol>
);

export default Timeline;
