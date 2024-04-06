"use client"
import React, { useEffect, useState } from 'react';
import { Form, Input,  Popconfirm, Table, Typography,Select,Button,Tag } from 'antd';
  const options = [
      {
        value: 'Mon-1',
        label: 'Monday-1',
      },
      {
        value: 'Mon-2',
        label: 'Monday-2',
      },
      {
        value: 'Tue-1',
        label: 'Tuesday-1',
      },
      {
        value: 'Tue-2',
        label: 'Tuesday-2',
      },
      {
        value: 'Wed-1',
        label: 'Wednesday-1',
      },
      {
        value: 'Wed-2',
        label: 'Wednesday-2',
      },
      {
          value: 'Thu-1',
          label: 'Thursday-1',
        },
      {
          value: 'Thu-2',
          label: 'Thursday-2',
        },
      {
          value: 'Fri-1',
          label: 'Friday-1',
        },
      {
          value: 'Fri-2',
          label: 'Friday-2',
        },
      {
          value: 'Sat-1',
          label: 'Saturday-1',
        },
    ];


var shifts = [];

const handleChange = (value) => {
  shifts=value
  console.log(shifts);
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'select' ?
  <Select
  mode="multiple"
  size="large"
  placeholder="Please select Free Shifts"
  initialvalues={[]}
  onChange={handleChange}
  style={{
    width: '100%',
  }}
  options={options.map(item=>item)}

/>: <Input placeholder='Please Enter Faculty Name' size='large'/>;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Faculty = ({form,data,count,values,setCount,setData}) => {

  const [editingKey, setEditingKey] = useState('');
  const [submittable, setSubmittable] = useState(true);
  const [editable, setEditable] = useState(false);

  const [start, setStart] = useState(true);

  const isEditing = (record) => record.key === editingKey;
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);


  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      freeshifts: [],
      ...record,
    });
    setEditingKey(record.key);
    setEditable(true);
  };
  const cancel = () => {
    setEditingKey('');
    setEditable(false);
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
    finally{
        setEditable(false);
        setStart(false);
        console.log("Form",form,values)
    }
  };

  const handleAdd = () => {

    const newData = {
      key: count,
    };
    setData([...data, newData]);
    setCount(count + 1);
    form.setFieldsValue({
        name: '',
        freeshifts: [],
        ...newData,
      });
      setEditingKey(count)
      setEditable(true);
      setStart(true);
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    setEditingKey('');
    setEditable(false);
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color='blue'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginInlineEnd: 4,
        }}
      >
        {label}
      </Tag>
    );
  };
  const columns = [
    {
      title: 'Faculy Name',
      dataIndex: 'name',
      width: '35%',
      editable: true,
    },
    {
      title: 'Free Shifts',
      dataIndex: 'freeshifts',
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return  (
          <span>
            <Select
              mode="multiple"
              size="medium"
              placeholder="Please select"
              tagRender={tagRender}
              defaultValue={record.freeshifts}
              onChange={handleChange}
              style={{
                width: '100%',
                backgroundColor:'white'
              }}
              optionRender={options.tagRender}
              disabled={!editable}
            />
          </span>
        );
      }
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '15%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
            <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
              disabled={!submittable}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?"  onClick={cancel}>
              <a className='text-orange-500 mr-4' disabled={start}>Cancel</a>
            </Popconfirm>
            <Popconfirm title="Sure to Delete?" onConfirm={() => handleDelete(record.key)}>
              <a className='text-red-700'>Delete</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'freeshifts' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
        <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
        disabled={editable}
      >
        Add a row
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default Faculty;