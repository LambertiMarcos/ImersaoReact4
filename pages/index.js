function Titulo(props) {
  console.log(props);
  const Tag = props.tag;
  return(
    <>
    <Tag>{props.children}</Tag>
    <style jsx>{`
      ${Tag} {
        color:red;
        font-s