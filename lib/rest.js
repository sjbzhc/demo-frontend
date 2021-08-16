const restRepository = {
  get: async (token, endpoint) => fetch(`http://localhost:8080/${endpoint}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  }),
};

export default restRepository;
