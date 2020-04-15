import lodash from "lodash";

export const reduceTypes = types =>
  lodash.reduce(
    types,
    (types, type) => {
      return { ...types, [type]: lodash.camelCase(type) };
    },
    {}
  );
