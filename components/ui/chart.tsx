import type React from "react"

export const Area = () => null
export const AreaChart = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const CartesianGrid = () => null
export const Legend = () => null
export const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const Tooltip = (props: any) => null // Changed to accept any props and return null
export const XAxis = ({ dataKey }: { dataKey: string }) => <></>
export const YAxis = () => <></>
export const Bar = () => null
export const BarChart = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const Cell = () => null
export const Pie = () => null
export const PieChart = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const Line = () => null
export const LineChart = ({ children }: { children: React.ReactNode }) => <>{children}</>

