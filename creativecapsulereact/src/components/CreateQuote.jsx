import { useQueryClient } from "@tanstack/react-query";
import { Form, Input, InputNumber, message, Modal } from "antd";
import axios from "axios";
import { useEffect } from "react";
const CreateEditQuote = ({ handleOnCancel, isShowAddOpen, editItem }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (editItem) {
      form.setFieldsValue({
        text: editItem.text,
        author_name: editItem.author_name,
        quote: editItem.likes,
      });
    }
  }, [editItem]);
  return (
    <>
      <Modal
        title={editItem ? "Edit Quote" : "Add Quote"}
        onCancel={() => handleOnCancel()}
        open={isShowAddOpen}
        onOk={() => {
          form.validateFields().then((values) => {
            delete values.quote;

            if (editItem?._id) {
              axios
                .patch(
                  `https://app-quotes-nest-2025.onrender.com/quote/${editItem._id}`,
                  {
                    ...values,
                  }
                )
                .then(() => {
                  message.success("Quote updated");
                })
                .finally(() => {
                  queryClient.invalidateQueries({ queryKey: ["quotes"] });
                  form.resetFields();
                  handleOnCancel(false);
                });
            } else {
              axios
                .post("https://app-quotes-nest-2025.onrender.com/quote", {
                  ...values,
                })
                .then(() => {
                  message.success("Quote added");
                })
                .finally(() => {
                  queryClient.invalidateQueries({ queryKey: ["quotes"] });
                  form.resetFields();
                  handleOnCancel(false);
                });
            }
          });
        }}
      >
        <Form form={form}>
          <Form.Item required label={"Quote"} name={"text"}>
            <Input />
          </Form.Item>
          <Form.Item required label={"Author"} name={"author_name"}>
            <Input />
          </Form.Item>
          <Form.Item required label={"Likes"} name={"quote"}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateEditQuote;
