const mapping = {
  "patient/:id": {
    "changeTreatment": { handle: function(x) { return 'hi' } };
  }
}
export default function(path, domainModel) {
  return false if !mapping[path];
  return mapping[path][domainModel];
}
