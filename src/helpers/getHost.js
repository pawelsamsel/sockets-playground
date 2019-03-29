const getHost = () => {
  const chunks = window.location.href.split('/');
  return `${chunks[0]}//${chunks[2]}`;
};

export default getHost;
