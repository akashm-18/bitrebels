import React from "react";

const Tile = ({ title, description, icon }) => {
   return (
      <div className="bg-white shadow-lg rounded-lg p-6">
         <div className="text-2xl text-gray-700 mb-4">{icon}</div>
         <h3 className="text-xl font-semibold mb-2">{title}</h3>
         <p className="text-gray-600">{description}</p>
      </div>
   );
};

const TilesSection = () => {
   const tilesData = [
      {
         title: "Tile 1",
         description: "This is the description for Tile 1.",
         icon: <i className="fas fa-cog"></i>,
      },
      {
         title: "Tile 2",
         description: "This is the description for Tile 2.",
         icon: <i className="fas fa-chart-bar"></i>,
      },
      {
         title: "Tile 3",
         description: "This is the description for Tile 3.",
         icon: <i className="fas fa-user"></i>,
      },
      {
         title: "Tile 1",
         description: "This is the description for Tile 1.",
         icon: <i className="fas fa-cog"></i>,
      },
      {
         title: "Tile 2",
         description: "This is the description for Tile 2.",
         icon: <i className="fas fa-chart-bar"></i>,
      },
      {
         title: "Tile 3",
         description: "This is the description for Tile 3.",
         icon: <i className="fas fa-user"></i>,
      },
      {
         title: "Tile 1",
         description: "This is the description for Tile 1.",
         icon: <i className="fas fa-cog"></i>,
      },
      {
         title: "Tile 2",
         description: "This is the description for Tile 2.",
         icon: <i className="fas fa-chart-bar"></i>,
      },
      {
         title: "Tile 3",
         description: "This is the description for Tile 3.",
         icon: <i className="fas fa-user"></i>,
      },
      {
         title: "Tile 1",
         description: "This is the description for Tile 1.",
         icon: <i className="fas fa-cog"></i>,
      },
      {
         title: "Tile 2",
         description: "This is the description for Tile 2.",
         icon: <i className="fas fa-chart-bar"></i>,
      },
      {
         title: "Tile 3",
         description: "This is the description for Tile 3.",
         icon: <i className="fas fa-user"></i>,
      },
      {
         title: "Tile 1",
         description: "This is the description for Tile 1.",
         icon: <i className="fas fa-cog"></i>,
      },
      {
         title: "Tile 2",
         description: "This is the description for Tile 2.",
         icon: <i className="fas fa-chart-bar"></i>,
      },
      {
         title: "Tile 3",
         description: "This is the description for Tile 3.",
         icon: <i className="fas fa-user"></i>,
      },
      {
         title: "Tile 1",
         description: "This is the description for Tile 1.",
         icon: <i className="fas fa-cog"></i>,
      },
      {
         title: "Tile 2",
         description: "This is the description for Tile 2.",
         icon: <i className="fas fa-chart-bar"></i>,
      },
      {
         title: "Tile 3",
         description: "This is the description for Tile 3.",
         icon: <i className="fas fa-user"></i>,
      },
      {
         title: "Tile 1",
         description: "This is the description for Tile 1.",
         icon: <i className="fas fa-cog"></i>,
      },
      {
         title: "Tile 2",
         description: "This is the description for Tile 2.",
         icon: <i className="fas fa-chart-bar"></i>,
      },
      {
         title: "Tile 3",
         description: "This is the description for Tile 3.",
         icon: <i className="fas fa-user"></i>,
      },
   ];

   return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
         {tilesData.map((tile, index) => (
            <Tile key={index} {...tile} />
         ))}
      </div>
   );
};

const App = () => {
   return (
      <div>
         <TilesSection />
      </div>
   );
};

export default App;
