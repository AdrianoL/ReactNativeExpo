import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getDaysInMonth, subMinutes, subHours, subDays, startOfDay, subMonths, addDays, format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const generateData = (timeFrame) => {
  let labels = [], data = [];
  const now = new Date();

  switch (timeFrame) {
    case '1h':
      labels = [...Array(6).keys()].map(i => format(subMinutes(now, 10 * (5 - i)), 'mm'));
      data = labels.map(() => Math.random() * 100);
      break;
    case '1d':
      labels = [...Array(24).keys()].map(i => format(subHours(now, 23 - i), 'HH'));
      data = labels.map(() => Math.random() * 100);
      break;
    case '1w':
      labels = [...Array(7).keys()].map(i => format(subDays(now, 6 - i), 'dd'));
      data = labels.map(() => Math.random() * 100);
      break;
    case '1m':
      const lastMonth = subMonths(now, 1);
      const daysInMonth = getDaysInMonth(lastMonth);
      labels = [...Array(daysInMonth).keys()].map(i => format(subDays(now, daysInMonth - i), 'dd'));
      data = labels.map(() => Math.random() * 100);
      break;
  }
  return {
    labels,
    datasets: [{ data }]
  };
};

const ChartScreen = () => {
  const [timeFrame, setTimeFrame] = useState('1h');
  const chartData = generateData(timeFrame);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <Button title="1 Hora" onPress={() => setTimeFrame('1h')} />
      <Button title="1 Día" onPress={() => setTimeFrame('1d')} />
      <Button title="1 Semana" onPress={() => setTimeFrame('1w')} />
      <Button title="1 Mes" onPress={() => setTimeFrame('1m')} />
      <Text>Visualización Actual: {timeFrame}</Text>
    </View>
  );
};

export default ChartScreen;
