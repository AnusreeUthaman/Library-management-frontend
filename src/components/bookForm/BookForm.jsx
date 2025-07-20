import React, { useState, useEffect } from "react";
import InputField from "../UI/inputs/InputField";
import Button from "../UI/button/Button";

  const BookForm = ({ id, initialData = {}, authors = [], genre = [], onSubmit }) => {
  
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [publication_year, setPublicationYear] = useState(initialData.publication_year || "");
  const [isbn, setIsbn] = useState(initialData.isbn || "");
  const [number_of_copies, setNumberOfCopies] = useState(initialData.number_of_copies || "");
  const [available_copies, setAvailableCopies] = useState(initialData.available_copies || "");
 
  const [selectedAuthors, setSelectedAuthors] = useState(
    Array.isArray(initialData.author) 
      ? initialData.author.map(String)
      : []
  );  
  const [selectedGenre, setSelectedGenre] = useState(
    initialData.genre?.toString() || ""
  );
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(initialData.image || "");
  const [multipleImages, setMultipleImages] = useState([]);
  const [multipleImagesPreview, setMultipleImagesPreview] = useState([]);
  const [condition, setCondition] = useState(initialData.condition || "available");
  const [isAvailable, setIsAvailable] = useState(initialData.is_available ?? true);
  const [needsReplacement, setNeedsReplacement] = useState(initialData.needs_replacement ?? false);

  useEffect(() => {
    if (id && initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setPublicationYear(initialData.publication_year || "");
      setIsbn(initialData.isbn || "");
      setNumberOfCopies(initialData.number_of_copies || "");
      setAvailableCopies(initialData.available_copies || "");
      setSelectedAuthors(
      Array.isArray(initialData.author) 
        ? initialData.author.map(String) 
        : []
      );
      setSelectedGenre(initialData.genre?.toString() || "");
      
      setCoverImagePreview(initialData.image || "");
      setCondition(initialData.condition || "available");
      setIsAvailable(initialData.is_available ?? true);
      setNeedsReplacement(initialData.needs_replacement ?? false);
      if (initialData.images) {
        setMultipleImagesPreview(initialData.images.map(image => `http://127.0.0.1:8000${image.images}`));
      }
    }
  }, [ initialData,id]);
  console.log(initialData)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("isbn", isbn);
    formData.append("number_of_copies", Number(number_of_copies));
    formData.append("available_copies", Number(available_copies));
    formData.append("publication_year", Number(publication_year));
    
      selectedAuthors.forEach(author => {
    if (author) {
      formData.append("author", String(author));
    }
    });
   
     if (selectedGenre) {
    formData.append("genre", String(selectedGenre));
    }
    if (coverImage) formData.append("image", coverImage);
    multipleImages.forEach((img) => formData.append("images", img));
    if (id) {
      formData.append("condition", condition);
      formData.append("is_available", isAvailable ? "true" : "false");
      formData.append("needs_replacement", needsReplacement ? "true" : "false");
    } else {
      formData.append("is_available", "true");
    }
  // for (let [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }
    onSubmit(formData);
  };

 
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  
  const handleMultipleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setMultipleImages((prev) => [...prev, ...files]);
    setMultipleImagesPreview((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = "";
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-4 border rounded border-gray-300 shadow"
    >
      <h2 className="text-2xl font-bold text-center text-cyan-700">{id ? "Edit Book" : "Add Book"}</h2><hr className="border-gray-200"/>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <label htmlFor="genre" className="block text-gray-700 mb-1">Genre</label>
          <select
            value={selectedGenre || ""}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition duration-200 text-gray-700"
          >
            <option value="">Select Genre</option>
            {genre.map((g) => (
              <option value={String(g.id)} key={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Author</label>
          <select
            multiple
            value={selectedAuthors}
            onChange={(e) =>
              setSelectedAuthors(Array.from(e.target.selectedOptions, (option) => option.value))
            }
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-300 h-29"
          >
            {authors.map((author) => (
              <option value={String(author.id)} key={author.id}>
                {author.name}
              </option>
            ))}
          </select>
            
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-300 resize-none"
          />
        </div>

        <InputField
          label="Publication Year"
          name="publication_year"
          value={publication_year}
          onChange={(e) => setPublicationYear(e.target.value)}
        />
        <InputField
          label="ISBN-10"
          name="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <InputField
          label="Number of Copies"
          name="number_of_copies"
          value={number_of_copies}
          onChange={(e) => setNumberOfCopies(e.target.value)}
        />
        <InputField
          label="Available Copies"
          name="available_copies"
          value={available_copies}
          onChange={(e) => setAvailableCopies(e.target.value)}
        />
      </div>

      <div>
      <label htmlFor="coverImage" className="block text-gray-700 mb-1">Cover Image</label>
      <input type="file" onChange={handleCoverChange} accept="image/*" className="w-full border rounded p-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition duration-200 border-gray-300" />
      {(coverImagePreview && coverImage) ? (
        <img src={coverImagePreview} alt="cover" className="mt-2 rounded max-h-40" />
      ) : (
        initialData.image && (
          <img src={`http://127.0.0.1:8000${initialData.image}`} alt="cover" className="mt-2 rounded max-h-40" />
        )
      )}
    </div>

    <div>
      <label htmlFor="multiple_images" className="block text-gray-700 mb-1">Additional Images</label>
      <input type="file" accept="image/*" multiple onChange={handleMultipleImageChange} className="w-full border rounded p-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition duration-200 border-gray-300" />

      <div className="flex space-x-2 mt-2 flex-wrap">
        {[...(initialData.images || []).map(img => `http://127.0.0.1:8000${img.images}`), ...multipleImagesPreview]
          .filter((src, index, self) => self.indexOf(src) === index) // remove duplicates
          .map((src, id) => (
            <img key={id} src={src} alt={`Preview ${id}`} className="h-20 rounded" />
          ))}
      </div>

    </div>

      {!id && (
        <Button variant="create" type="submit" className="ml-68">
          Add Book
        </Button>
      )}

      {id && (
        <>
          <div className="flex flex-col space-y-2">
            <label>Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="available">Available</option>
              <option value="damaged">Damaged</option>
              <option value="under_maintenance">Under Maintenance</option>
              <option value="lost">Lost</option>
            </select>
            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
              <span>Is Available</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={needsReplacement}
                onChange={(e) => setNeedsReplacement(e.target.checked)}
              />
              <span>Needs Replacement</span>
            </label>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button variant="update" type="submit" className="ml-68">
              Update Book
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default BookForm;
