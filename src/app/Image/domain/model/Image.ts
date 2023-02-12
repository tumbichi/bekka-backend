export default class Image {
  name: string;
  url: string;
  secure_url: string;
  format: string;
  publicId: string;
  version: string;

  constructor(name: string, url: string, secure_url: string, format: string, publicId: string, version: string) {
    this.name = name;
    this.url = url;
    this.secure_url = secure_url;
    this.format = format;
    this.publicId = publicId;
    this.version = version;
  }
}
