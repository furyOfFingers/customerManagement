declare module "*.styl";
declare module "schemes/*";
declare module "*.jpg";
declare module "*.svg" {
  const content: string;
  export default content;
}
