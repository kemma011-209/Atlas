import React from "react";
import { Card, LineChart } from "@tremor/react";

const SentimentTremorGraph = () => {
  // Dummy data for sentiment trends
  const data = [
    { day: "Mon", sentiment: 3 },
    { day: "Tue", sentiment: 2 },
    { day: "Wed", sentiment: -1 },
    { day: "Thu", sentiment: -2 },
    { day: "Fri", sentiment: 1 },
    { day: "Sat", sentiment: 4 },
    { day: "Sun", sentiment: 3 },
  ];

  return (
    <div className="w-[30rem] h-64 rounded-xl absolute top-8 right-4 bg-white">
      <Card>
        <LineChart
          data={data}
          dataKey="day"
          categories={["sentiment"]}
          colors={["blue"]}
          valueFormatter={(value) => `${value}`}
          height="h-56"
          marginTop="mt-4"
        />
      </Card>
    </div>
  );
};

export default SentimentTremorGraph;
