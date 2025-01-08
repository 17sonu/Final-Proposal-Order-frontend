import React from "react";

const Dashboard = () => {
  const cards = [
    { title: "Design Engineering", proposals: 12, orders: 7 },
    { title: "PMC", proposals: 10, orders: 8 },
    { title: "Pre Bid", proposals: 6, orders: 6 },
    { title: "Operational Management", proposals: 4, orders: 3 },
    { title: "Knowledge Management", proposals: 18, orders: 12 },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-3 gap-20">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-pink-400 to-purple-700 rounded-2xl shadow-lg p-8 w-72 h-48 flex flex-col justify-between transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <h2 className="text-center text-white text-xl font-bold mb-4">{card.title}</h2>
            <div className="grid grid-cols-2 divide-x divide-gray-400">
              <div className="text-center text-white">
                <p className="font-medium">Proposals:</p>
                <p>{card.proposals}</p>
              </div>
              <div className="text-center text-white">
                <p className="font-medium">Orders:</p>
                <p>{card.orders}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;