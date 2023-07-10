import AddPost from "../AddPost/AddPost";

export default function EditPost(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <AddPost
        onClose={() => props.onClose()}
        show={props.show}
        mode="sideBar"
        edit={true}
        postId={props.postId}
      />
    </div>
  );
}
