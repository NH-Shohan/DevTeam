'use client';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

import { toast } from 'react-toastify';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [fileStore, setFileStore] = useState(null);
  const [userType, setUserType] = useState('programmer');

  const notify = (event) => {
    console.log(event);
    if (event === 'success') {
      toast.success('Successfully Created!!', {
        position: toast.POSITION.TOP_RIGHT,
        className: 'foo-bar',
      });
    } else if (event.response.statusText === 'Internal Server Error') {
      toast.error('Duplicate Email Detected!', {
        position: toast.POSITION.TOP_RIGHT,
        className: 'foo-bar',
      });
    } else {
      toast.error('There was an error!', {
        position: toast.POSITION.TOP_RIGHT,
        className: 'foo-bar',
      });
    }
  };

  const onSubmit = async (data) => {
    const {
      name,
      email,
      password,
      gitHubUsername,
      photo,
      bio,
      contactInformation,
      location,
      socialMediaLinks,
      education,
      projects,
      experiences,
    } = data;

    if (name.length < 4) {
      setError('name', {
        type: 'manual',
        message: 'Name must be at least 4 characters',
      });
      return;
    }

    if (!email) {
      setError('email', { type: 'manual', message: 'Invalid email address' });
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password)) {
      setError('password', {
        type: 'manual',
        message:
          'Password must be 8 characters and contain at least 1 uppercase letter',
      });
      return;
    }

    if (!gitHubUsername) {
      setError('gitHubUsername', {
        type: 'manual',
        message: 'GitHub Username is required',
      });
      return;
    }

    if (!previewImage || !previewImage[0]) {
      setError('photo', {
        type: 'manual',
        message: 'Please select a photo.',
      });
      return;
    }

    const allowedImageTypes = ['image/jpeg', 'image/png'];
    if (
      previewImage[0]?.type &&
      !allowedImageTypes.includes(previewImage[0].type)
    ) {
      setError('photo', {
        type: 'manual',
        message: 'Invalid photo format. Please use JPEG or PNG.',
      });
      return;
    }

    if (previewImage[0]?.size && previewImage[0].size > 1024 * 1024) {
      setError('photo', {
        type: 'manual',
        message: 'Photo size must be less than 1 MB.',
      });
      return;
    }

    if (!bio || bio.length < 10) {
      setError('bio', {
        type: 'manual',
        message: 'Bio must be at least 10 characters',
      });
      return;
    }

    if (!contactInformation) {
      setError('contactInformation', {
        type: 'manual',
        message: 'Contact Information is required',
      });
      return;
    }

    if (!location) {
      setError('location', {
        type: 'manual',
        message: 'Location is required',
      });
      return;
    }

    if (!socialMediaLinks) {
      setError('socialMediaLinks', {
        type: 'manual',
        message: 'Social Media Links are required',
      });
      return;
    }

    if (!education) {
      setError('education', {
        type: 'manual',
        message: 'Education is required',
      });
      return;
    }

    if (!projects) {
      setError('projects', {
        type: 'manual',
        message: 'Projects are required',
      });
      return;
    }

    if (!experiences) {
      setError('experiences', {
        type: 'manual',
        message: 'Experiences are required',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('gitHubUsername', data.gitHubUsername);
    formData.append('imageName', data.imageName);
    data.photo = previewImage;
    formData.append('photo', data.photo);
    data.imageName = fileStore;
    formData.append('imageName', data.imageName);
    formData.append('bio', data.bio);
    formData.append('contactInformation', data.contactInformation);
    formData.append('location', data.location);
    formData.append('socialMediaLinks', data.socialMediaLinks);
    formData.append('education', data.education);
    formData.append('projects', data.projects);
    formData.append('experiences', data.experiences);

    try {
      const response = await axios.post(
        'http://localhost:3333/programmer/profile',
        formData,
      );
      console.log('API Response:', response);

      notify('success');
    } catch (error) {
      console.error('API Error:', error.response || error);
      notify(error);
    }
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random()
      .toString(36)
      .slice(2, 10)
      .toUpperCase();
    document.getElementById('password').value = randomPassword;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-secondary p-10 rounded-lg m-5 border border-blue w-2/3">
        <h1 className="text-4xl font-bold mb-7 text-blue text-center">
          Sign Up
        </h1>

        <div className="flex gap-5 mb-7 justify-center">
          <button
            className={`border py-3 px-8 rounded-lg ${
              userType === 'programmer'
                ? 'bg-blue hover:bg-[#3333bd99] text-white'
                : 'bg-gray-300'
            } transition-all flex justify-center items-center w-fit`}
            onClick={() => handleUserTypeChange('programmer')}
            disabled={userType === 'programmer'}
          >
            Programmer
          </button>
          <button
            className={`border py-3 px-8 rounded-lg ${
              userType === 'company'
                ? 'bg-blue hover:bg-[#3333bd99] text-white'
                : 'bg-gray-300'
            } transition-all flex justify-center items-center w-fit`}
            onClick={() => handleUserTypeChange('company')}
            disabled={userType === 'company'}
          >
            Company
          </button>
        </div>

        {userType === 'programmer' && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative rounded w-full"
            noValidate
          >
            <div className="flex w-full gap-5">
              <div className="mb-1 w-full">
                <label className="block text-sm font-bold mb-1">Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: 'Name is required',
                    minLength: {
                      value: 4,
                      message: 'Name must be at least 4 characters',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                    />
                  )}
                />
                {errors.name && (
                  <span className="text-red text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="mb-1 w-full">
                <label className="block text-sm font-bold mb-1">
                  Github Username
                </label>
                <Controller
                  name="gitHubUsername"
                  control={control}
                  rules={{
                    required: 'GitHub Username is required',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your username"
                      className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                    />
                  )}
                />
                {errors.gitHubUsername && (
                  <span className="text-red text-sm">
                    {errors.gitHubUsername.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-1">
              <label className="block text-sm font-bold mb-1">Email</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                  />
                )}
              />
              {errors.email && (
                <span className="text-sm text-red">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-1">
              <label className="block text-sm w-full font-bold mb-1">
                Password
              </label>
              <div className="flex justify-between gap-4">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <div className="w-full relative">
                      <input
                        {...field}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-2xl absolute right-3 top-3"
                      >
                        {showPassword ? (
                          <>
                            <FaRegEye />
                          </>
                        ) : (
                          <>
                            <FaEyeSlash />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                />
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="border border-blue py-3 px-8 rounded-lg bg-blue hover:bg-[#3333bd99] transition-all text-white flex justify-center items-center w-[280px] h-12"
                >
                  Generate Password
                </button>
              </div>
              {errors.password && (
                <span className="text-red text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Photo
              </label>
              <Controller
                name="photo"
                control={control}
                // rules={{
                //   required: "Photo is required",
                // }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="file"
                    onChange={handlePhotoChange}
                    accept=".jpg, .jpeg, .png"
                    className="w-fit px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                  />
                )}
              />
              {previewImage && (
                <div className="mb-4">
                  {previewImage && (
                    <div className="mt-2 w-20 h-20">
                      <Image
                        src={previewImage}
                        alt="Selected Avatar"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
              )}
              {errors.photo && (
                <span className="text-red text-sm">{errors.photo.message}</span>
              )}
            </div>

            <div className="mb-1 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                imageName
              </label>
              <Controller
                name="imageName"
                control={control}
                rules={{
                  required: 'image Name is required',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your image name"
                    className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                  />
                )}
              />
              {errors.imageName && (
                <span className="text-red text-sm">
                  {errors.imageName.message}
                </span>
              )}
            </div>

            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bio
              </label>
              <Controller
                name="bio"
                control={control}
                rules={{
                  required: 'National ID is required',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your bio"
                    className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                  />
                )}
              />
              {errors.bio && (
                <span className="text-red text-sm">{errors.bio.message}</span>
              )}
            </div>

            <div className="flex gap-5">
              <div className="mb-1 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ContactInformation
                </label>
                <Controller
                  name="contactInformation"
                  control={control}
                  rules={{
                    required: 'contact Information is required',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your contact Information"
                      className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                    />
                  )}
                />
                {errors.contactInformation && (
                  <span className="text-red text-sm">
                    {errors.contactInformation.message}
                  </span>
                )}
              </div>

              <div className="mb-1 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  location
                </label>
                <Controller
                  name="location"
                  control={control}
                  rules={{
                    required: 'Location is required',
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your location"
                      className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                    />
                  )}
                />
                {errors.location && (
                  <span className="text-red text-sm">
                    {errors.location.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Social Media Links
              </label>
              <Controller
                name="socialMediaLinks"
                control={control}
                rules={{
                  required: 'social Media Links is required',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your  Social Media Links"
                    className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                  />
                )}
              />
              {errors.socialMediaLinks && (
                <span className="text-red text-sm">
                  {errors.socialMediaLinks.message}
                </span>
              )}
            </div>

            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Education
              </label>
              <Controller
                name="education"
                control={control}
                rules={{
                  required: 'education is required',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your education"
                    className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                  />
                )}
              />
              {errors.education && (
                <span className="text-red text-sm">
                  {errors.education.message}
                </span>
              )}
            </div>

            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Projects
              </label>
              <Controller
                name="projects"
                control={control}
                rules={{
                  required: 'Projects is required',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your Projects"
                    className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                  />
                )}
              />
              {errors.projects && (
                <span className="text-red text-sm">
                  {errors.projects.message}
                </span>
              )}
            </div>

            <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Experiences
              </label>
              <Controller
                name="experiences"
                control={control}
                rules={{
                  required: 'Experiences is required',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your Experiences"
                    className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                  />
                )}
              />
              {errors.experiences && (
                <span className="text-red text-sm">
                  {errors.experiences.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="border border-blue py-3 px-8 rounded-lg bg-blue hover:bg-[#3333bd99] transition-all text-white flex justify-center items-center w-1/4"
              >
                Sigup
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
