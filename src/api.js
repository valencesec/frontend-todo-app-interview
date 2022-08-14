const URL = "https://zyh0ypgh08.execute-api.eu-west-1.amazonaws.com/prod/todos";

export const deleteItem = async (apiKey, id) => {
  await fetch(`${URL}?records[]=${id}`, {
    method: "DELETE",
    headers: {
      "X-Api-Key": apiKey,
    },
  });
};

export const getAllTodos = async (apiKey) => {
  const response = await fetch(URL, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  return await response.json();
};

export const addItem = async (apiKey) => {
  await fetch(URL, {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            Status: "Todo",
            Tags: ["tag1"],
            Text: "task",
          },
        },
      ],
    }),
  });
};

export const updateItem = async (apiKey, id, Status) => {
  await fetch(URL, {
    method: "PATCH",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({
      records: [
        {
          id,
          fields: {
            Status,
          },
        },
      ],
    }),
  });
};
