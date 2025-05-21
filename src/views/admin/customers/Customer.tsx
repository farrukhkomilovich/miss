import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import { clients, formatCurrency } from '@/data/mockData';
import { Client } from '@/data/types';

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredClients(clients);
      return;
    }

    const filtered = clients.filter(
      client =>
        client.name.toLowerCase().includes(term.toLowerCase()) ||
        client.phone.includes(term) ||
        client.service.toLowerCase().includes(term.toLowerCase()) ||
        client.consultant.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredClients(filtered);
  };

  const columns = [
    { title: 'Mijoz ismi', dataIndex: 'name', key: 'name' },
    { title: 'Telefon raqami', dataIndex: 'phone', key: 'phone' },
    { title: 'Xizmat turi', dataIndex: 'service', key: 'service' },
    { title: 'Konsultant', dataIndex: 'consultant', key: 'consultant' },
    {
      title: "To'lov",
      dataIndex: 'payment',
      key: 'payment',
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "To'lov usuli",
      dataIndex: 'paymentType',
      key: 'paymentType',
      render: (value: string) => (
        <div className="flex items-center">
          {value === 'cash' ? (
            <DollarCircleOutlined className="mr-1 text-green-500" />
          ) : (
            <CreditCardOutlined className="mr-1 text-blue-500" />
          )}
          {value === 'cash' ? 'Naqd' : 'Karta'}
        </div>
      ),
    },
    {
      title: 'Holati',
      dataIndex: 'isReserved',
      key: 'isReserved',
      render: (value: boolean) => (
        <div className={value ? 'notion-status-yellow' : 'notion-status-green'}>
          {value ? 'Bron qilingan' : 'Tashrif buyurgan'}
        </div>
      ),
    },
    {
      title: 'Tashrif vaqti',
      dataIndex: 'visitDate',
      key: 'visitDate',
      render: (value: string) => (
        <div className="flex items-center">
          <ClockCircleOutlined className="mr-1 text-gray-400" />
          {new Date(value).toLocaleDateString('uz-UZ')}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mijozlar</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Yangi mijoz
        </Button>
      </div>

      <Input
        prefix={<SearchOutlined />}
        placeholder="Mijoz ismi, telefon raqami yoki xizmat turi bo'yicha qidirish..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-6 max-w-xl"
      />

      <Table
        dataSource={filteredClients}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default Customer