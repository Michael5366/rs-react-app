const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error response: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;
