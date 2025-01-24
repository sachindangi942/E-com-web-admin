// import { Form, Input, Select } from "antd";

// export const MyForms = ({ form, fields, onFinish, children }) => {
  
//   return (
//     <Form form={form} onFinish={onFinish} layout="vertical" name="dynamicForm">
//       {fields.map((field, index) => (
//         <Form.Item
//           key={index}
//           label={field.label}
//           name={field.name}
//           rules={field.rules}
//         >
//           {field.type === "select" ? (
//             <Select
//               placeholder={field.placeholder}
//               showSearch={field.showSearch}
//               filterOption={field.filterOption}
//             >
//               {field.options.map((option) => (
//                 <Select.Option key={option.value} value={option.value}>
//                   {option.label}
//                 </Select.Option>
//               ))}
//             </Select>
//           ) : (
//             <Input placeholder={field.placeholder} />
//           )}
//         </Form.Item>
//       ))}
//       <Form.Item>{children}</Form.Item>
//     </Form>
//   );
// };




import { Form, Input, Select } from "antd";

export const MyForms = ({ form, fields, onFinish, children }) => {  
  return (
    <Form form={form} onFinish={onFinish} layout="vertical" name="dynamicForm">
      {fields.map((field, index) => {
        // console.log(`Field Name: ${field.name}`, "Options:", field.options);

        return (
          <Form.Item key={index} label={field.label} name={field.name} rules={field.rules}>
            {field.type === "select" ? (
              <Select placeholder={field.placeholder} showSearch={field.showSearch} filterOption={field.filterOption}>
                {field.options?.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input placeholder={field.placeholder} />
            )}
          </Form.Item>
        );
      })}
      <Form.Item>{children}</Form.Item>
    </Form>
  );
};
