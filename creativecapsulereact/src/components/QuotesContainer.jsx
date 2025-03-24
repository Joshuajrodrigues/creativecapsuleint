import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, List, message, Tag, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import CreateEditQuote from "./CreateQuote";
import { useCallback } from "react";
import { Input } from "antd";
import { useParams, useSearchParams } from "react-router";

export const fetchQuotes = async (author) => {
  const resp = await axios.get(
    `https://app-quotes-nest-2025.onrender.com/quote?page=1&author_name=${
      author || ""
    }`
  );

  return resp.data;
};

const QuotesContainer = () => {
  const [author, setAuthor] = useState("");
  const [isShowAddOpen, setIsShowAddOpen] = useState(false);
  let [searchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState("");

  useState(() => {
    if (searchParams.get("author")) {
      setAuthor(searchParams.get("author"));
      setSearchValue(searchParams.get("author"));
    }
  }, [searchParams.get("author")]);

  const quotes = useQuery({
    queryKey: ["quotes", author],
    queryFn: () => fetchQuotes(author),
  });

  const [isShowDeleteOpen, setIsShowDeleteOpen] = useState({
    open: false,
    item: null,
  });

  const [isShowEditOpen, setIsShowEditOpen] = useState({
    open: false,
    item: null,
  });

  const handleDeleteCancel = () => {
    setIsShowDeleteOpen(false);
  };
  const handleEdit = (item) => {
    setIsShowEditOpen({
      open: true,
      item,
    });
  };

  const handleOnCancelAddEdit = () => {
    setIsShowEditOpen({
      open: false,
      item: null,
    });
    setIsShowAddOpen(false);
  };

  const handleDeleteItem = (item) => {
    setIsShowDeleteOpen({
      open: true,
      item,
    });
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://app-quotes-nest-2025.onrender.com/quote/${isShowDeleteOpen.item._id}`
      )
      .then(() => {
        message.success("Quote deleted");
        setIsShowDeleteOpen({
          open: false,
          item: null,
        });
        quotes.refetch();
      });
  };

  const handleSearch = useCallback(async (query) => {
    setAuthor(query);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        <Input.Search
          placeholder="Search by author"
          allowClear
          defaultValue={searchValue}
          onSearch={(query) => {
            setSearchValue(query);
            handleSearch(query);
          }}
        />
        <Button onClick={() => setIsShowAddOpen(true)}>Add</Button>
      </div>
      <ConfirmDelete
        handleDelete={handleDelete}
        onCancel={handleDeleteCancel}
        open={isShowDeleteOpen.open}
      />
      <CreateEditQuote
        handleOnCancel={handleOnCancelAddEdit}
        isShowAddOpen={isShowAddOpen || isShowEditOpen.open}
        editItem={isShowEditOpen.item}
      />

      <List
        size="large"
        header={
          <Typography.Title style={{ textAlign: "left" }} level={3}>
            Quotes
          </Typography.Title>
        }
        bordered
        dataSource={quotes.data?.data
          .sort((a, b) => a.likes - b.likes)
          .reverse()}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => handleEdit(item)}>Edit</Button>,
              <Button onClick={() => handleDeleteItem(item)} danger level={5}>
                Delete
              </Button>,
            ]}
            style={{
              textAlign: "left",
            }}
          >
            <div className="quote-container--card">
              <div className="quote-container--quote">
                <p>{item.text}</p>
                <Tag className="quote-container--likes">{item.likes}</Tag>
              </div>
              <span className="quote-container--author">
                <em>~{item.author_name}</em>
              </span>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default QuotesContainer;
