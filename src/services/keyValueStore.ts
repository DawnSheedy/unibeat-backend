import { KeyValue } from "../models/KeyValue";

const getValue = async (key: string) => {
  const data = await KeyValue.findByPk(key);

  if (!data) {
    return null;
  }

  if (data) {
    return data.value;
  }
};

const setValue = async (key: string, value: string) => {
  const [data, created] = await KeyValue.findOrCreate({
    where: { key },
    defaults: { value },
  });

  if (!created) {
    data.set({ value });
    await data.save();
  }

  return value;
};

export { getValue, setValue };
