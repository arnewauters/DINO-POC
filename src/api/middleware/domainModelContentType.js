const DOMAIN_REGEX = /^(domain-model=)([A-z]*)$/g
export default function () {
  return function*(next) {

    let contentTypes = this.request.headers['content-type'];
    if(contentTypes) {
      let parts = contentTypes.split(';');
      for (var i = 0; i < parts.length; i++) {
          let res = DOMAIN_REGEX.exec(parts[i].trim());
          if (res) {
            this.request.domainModel = res[2];
            break;
          }
      }
    }
    yield* next;
  }
}
