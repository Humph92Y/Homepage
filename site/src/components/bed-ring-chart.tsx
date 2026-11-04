"use client";

import { Ring, RingCenter, RingChart } from "@/components/charts";

const ringData = [
  { label: "입원", value: 62, maxValue: 100 },
  { label: "재활", value: 24, maxValue: 100 },
  { label: "외래", value: 14, maxValue: 100 },
];

export default function BedRingChart() {
  return (
    <RingChart data={ringData} size={260} strokeWidth={14}>
      {ringData.map((item, i) => (
        <Ring index={i} key={item.label} />
      ))}
      <RingCenter defaultLabel="병상 구성" />
    </RingChart>
  );
}
