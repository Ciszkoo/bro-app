import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const PostSchema = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(10).max(250),
});

type PostSchemaType = z.infer<typeof PostSchema>;

const PostForm = () => {
  const { accessToken } = useOidcAccessToken();
  const [value, setValue] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(e);
    setValue(val);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });

  const onSubmit: SubmitHandler<PostSchemaType> = async (data) => {
    const response = await axios.post(
      "http://localhost:3000/posts",
      { title: data.title, content: data.content },
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );

    if (response.status !== 200) {
      console.log(response);
      reset();
      return;
    }

    console.log("Posted!");
    reset();
  };

  const { ref, onChange, ...rest } = register("content");

  return (
    <form
      className="mt-5 mr-5 ml-5 p-5 rounded-md shadow-md flex flex-col gap-2 bg-sky-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="shadow-inner rounded-md p-2 focus:outline-none"
        maxLength={50}
        placeholder="Title..."
        disabled={isSubmitting}
        spellCheck={false}
        autoComplete="off"
        {...register("title")}
      ></input>
      <textarea
        className="shadow-inner rounded-md p-2 focus:outline-none resize-none"
        onChange={handleChange}
        maxLength={250}
        placeholder="What's in your mind..."
        disabled={isSubmitting}
        spellCheck={false}
        autoComplete="off"
        ref={(e) => {
          ref(e);
          textAreaRef.current = e;
        }}
        {...rest}
      ></textarea>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-sky-300 rounded-md self-end py-2 px-4 shadow-md active:bg-sky-400 active:shadow-inner"
      >
        Send for approval
      </button>
    </form>
  );
};

export default PostForm;
