import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { List } from "antd";
import axios from "axios";
import React from "react";

const fetchAuthors = async () => {
  const resp = await axios.get(
    "https://app-quotes-nest-2025.onrender.com/author"
  );

  return resp.data;
};

const AuthorsContainer = () => {
  const authors = useQuery({ queryKey: ["authors"], queryFn: fetchAuthors });

  return (
    <>
      <List
        size="large"
        header={<Typography.Title style={{textAlign:"left"}} level={3}>Authors</Typography.Title>}
        bordered
        dataSource={authors.data}
        renderItem={(item) => <List.Item>{item.author_name}</List.Item>}
      />
    </>
  );
};

export default AuthorsContainer;
