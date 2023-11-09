'use client';

import { groupBy } from '@/lib/utils';
import { UserVisites } from '@/types/allTypes';
import formatDate from 'date-fns/format';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ViewStatisticsProps {
  statisticDatas: UserVisites[];
}

export function ViewStatistics({ statisticDatas }: ViewStatisticsProps) {
  const puredData = statisticDatas.map((value) => ({
    ...value,
    createdAt: formatDate(new Date(value.createdAt), 'MMMM yyyy'),
  }));
  const groupeddata = groupBy(puredData, (v) => v.createdAt);
  const statiscticValues = Object.keys(groupeddata).map((value) => ({
    name: value,
    total: groupeddata[value].length,
  }));
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={statiscticValues}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Legend />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#1d9efa" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
