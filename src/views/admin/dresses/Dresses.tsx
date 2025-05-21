import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  CalendarOutlined,
  SyncOutlined,
  DollarCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { dresses, formatCurrency, getStatusClass, getStatusLabel } from '@/data/mockData';
import { Dress } from '@/data/types';

const Dresses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDresses, setFilteredDresses] = useState<Dress[]>(dresses);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredDresses(dresses);
      return;
    }

    const filtered = dresses.filter(dress =>
      dress.code.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredDresses(filtered);
  };

  const columns = [
    {
      title: "Ko'ylak kodi",
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Narxi',
      dataIndex: 'price',
      key: 'price',
      render: (value: number) => (
        <div className="flex items-center">
          <DollarCircleOutlined className="mr-1 text-gray-500" />
          {formatCurrency(value)}
        </div>
      ),
    },
    {
      title: 'Keltirilgan sana',
      dataIndex: 'dateAcquired',
      key: 'dateAcquired',
      render: (value: string) => (
        <div className="flex items-center">
          <CalendarOutlined className="mr-1 text-gray-500" />
          {new Date(value).toLocaleDateString('uz-UZ')}
        </div>
      ),
    },
    {
      title: 'Ijara soni',
      dataIndex: 'rentCount',
      key: 'rentCount',
      render: (value: number) => (
        <div className="flex items-center">
          <SyncOutlined className="mr-1 text-gray-500" />
          {value} marta
        </div>
      ),
    },
    {
      title: 'Jami daromad',
      dataIndex: 'totalEarned',
      key: 'totalEarned',
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Foyda/Zarar',
      dataIndex: 'isProfit',
      key: 'isProfit',
      render: (_: boolean, record: Dress) => (
        <div className="flex items-center">
          {record.isProfit ? (
            <ArrowUpOutlined className="mr-1 text-green-500" />
          ) : (
            <ArrowDownOutlined className="mr-1 text-red-500" />
          )}
          {record.isProfit ? 'Foydada' : 'Zararda'}
        </div>
      ),
    },
    {
      title: 'Holati',
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => (
        <div className={getStatusClass(value)}>
          {getStatusLabel(value)}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ko'ylaklar</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Yangi ko'ylak
        </Button>
      </div>

      <Input
        placeholder="Ko'ylak kodi bo'yicha qidirish..."
        value={searchTerm}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        className="mb-6 max-w-xl"
      />

      <Table
        dataSource={filteredDresses}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default Dresses