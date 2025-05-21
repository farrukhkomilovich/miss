import React from 'react';
import { Card, Table } from 'antd';
import {
  UserOutlined,
  ShoppingOutlined,
  TeamOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import {
  dashboardStats,
  clients,
  departments,
  formatCurrency
} from '@/data/mockData';

export default function AdminHome() {
  const dressStatusData = [
    { name: "Bo'sh", value: dashboardStats.availableDresses, color: '#27AE60' },
    { name: 'Bron', value: dashboardStats.reservedDresses, color: '#F2C94C' },
    { name: 'Ijarada', value: dashboardStats.rentedDresses, color: '#EB5757' },
  ];

  const departmentData = departments.map(dept => ({
    name: dept.name,
    value: dept.revenue,
  }));

  const recentClients = [...clients]
    .sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime())
    .slice(0, 3);

  const stats = [
    {
      title: "Jami mijozlar",
      value: dashboardStats.totalClients,
      icon: <UserOutlined className="text-lg text-primary !text-[#824fe3]" />,
    },
    {
      title: "Ko'ylaklar soni",
      value: dashboardStats.totalDresses,
      icon: <ShoppingOutlined className="text-lg text-primary !text-[#824fe3]" />,
    },
    {
      title: "Konsultantlar",
      value: dashboardStats.totalConsultants,
      icon: <TeamOutlined className="text-lg text-primary !text-[#824fe3]" />,
    },
    {
      title: "Jami tushum",
      value: formatCurrency(dashboardStats.totalRevenue),
      icon: <DollarOutlined className="text-lg text-primary !text-[#824fe3]" />,
    }
  ];

  const columns = [
    { title: 'Mijoz ismi', dataIndex: 'name', key: 'name' },
    { title: 'Xizmat turi', dataIndex: 'service', key: 'service' },
    { title: 'Konsultant', dataIndex: 'consultant', key: 'consultant' },
    {
      title: 'To\'lov',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment: number) => formatCurrency(payment)
    },
    {
      title: 'Holati',
      dataIndex: 'isReserved',
      key: 'isReserved',
      render: (isReserved: boolean) => (
        <span className={isReserved ? 'text-yellow-500' : 'text-green-500'}>
          {isReserved ? '🟡 Bron qilingan' : '🟢 Tashrif buyurgan'}
        </span>
      )
    }
  ];

  return (
    <div className="animate-fade-in px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">{stat.title}</div>
                <div className="text-xl font-semibold">{stat.value}</div>
              </div>
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title={<div className="flex items-center gap-2"><ShoppingCartOutlined /> Ko'ylaklar holati</div>} className="shadow-sm">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dressStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {dressStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} ta`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={<div className="flex items-center gap-2"><BarChartOutlined /> Bo'limlar tushumlari</div>} className="shadow-sm">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), '']} />
                <Bar dataKey="value" fill="#9B51E0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Clients Table */}
      <Card title={<div className="flex items-center gap-2"><CalendarOutlined /> Oxirgi mijozlar</div>} className="shadow-sm">
        <Table
          dataSource={recentClients}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
}
