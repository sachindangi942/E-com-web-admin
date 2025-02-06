// import { Form, Input, Select } from "antd";

// export const MyForms = ({ form, fields, onFinish, children }) => {
//   return (
//     <Form form={form} onFinish={onFinish} layout="vertical" name="dynamicForm">
//       {fields.map((field, index) => {
//         return (
//           <Form.Item key={index} label={field.label} name={field.name} rules={field.rules}>
//             {field.type === "select" ? (
//               <Select placeholder={field.placeholder}
//                 showSearch={field.showSearch}
//                 filterOption={field.filterOption}
//                 onChange={field.onChange}
//                 disabled={field.disabled}
//               >
//                 {field.options?.map((option) => (
//                   <Select.Option key={option.value} value={option.value}>
//                     {option.label}
//                   </Select.Option>
//                 ))}
//               </Select>
//             ) : (
//               <Input
//                 placeholder={field.placeholder}
//                 disabled={field.disabled}
//               />
//             )}
//           </Form.Item>
//         );
//       })}
//       <Form.Item>{children}</Form.Item>
//     </Form>
//   );
// };



import { Form, Input, Select } from "antd";

export const MyForms = ({ form, fields, onFinish, children }) => {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical" name="dynamicForm">
      {fields.map((field, index) => (
        <Form.Item key={index} label={field.label} name={field.name} rules={field.rules}>
          {field.type === "select" ? (
            <Select
              placeholder={field.placeholder}
              showSearch={field.showSearch}
              filterOption={field.filterOption}
              onChange={field.onChange}
              disabled={field.disabled}
            >
              {field.options?.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          ) : field.type === "textarea" ? (
            <Input.TextArea
              placeholder={field.placeholder}
              disabled={field.disabled}
              rows={field.rows || 4} // Optional: Rows can be customized
            />
          ) : (
            <Input
              type={field.type || "text"}  // 👈 Type dynamically set kiya
              placeholder={field.placeholder}
              disabled={field.disabled}
            />
          )}
        </Form.Item>
      ))}
      <Form.Item>{children}</Form.Item>
    </Form>
  );
};
