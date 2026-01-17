export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const city = query.city as string;

  if (!city) {
    throw createError({
      statusCode: 400,
      statusMessage: "City is required.",
    });
  }

  const config = useRuntimeConfig();

  try {
    return await $fetch("http://api.weatherapi.com/v1/current.json", {
      params: {
        key: config.weatherApiKey,
        q: city,
        aqi: "no",
      },
    });
  } catch (err: any) {
    throw createError({
      statusCode: err?.response?.status || 500,
      statusMessage: "Error fetching weather data",
    });
  }
});
