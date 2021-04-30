export default function ImageTile() {
  return (
    <figure className="m-2 w-96 md:flex transition duration-500 ease-in-out bg-gray-100 rounded-xl hover:shadow-lg m-4">
      <img
        className="w-1/3 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
        src="/favicon.ico"
        alt=""
        width="10px"
        height="auto"
      />
      <div className="w-full p-1 md:w-2/3 text-left m-0 md:p-6  text-center md:text-left space-y-4">
        <blockquote>
          <p className="text-lg font-semibold">Tailwind CSS</p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-cyan-600">Date Added</div>
          <div className="text-gray-500">Link</div>
        </figcaption>
      </div>
    </figure>
  );
}
