// CreateRecruiter.jsx
'use client';
import { resizeImage } from '@/components/ResizeImage/ResizeImage';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

import { toast, ToastContainer } from 'react-toastify';

const CreateRecruiter = ({ currentEmail }) => {
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
  const onSubmit = async (data) => {
    const {
      name,
      username,
      email,
      password,
      imageName,
      photo,
      expertiseSkills,
      projectLinks,
      linkedInLink,
    } = data;

    const notify = (event) => {
      console.log(event);
      if (event === 'success') {
        toast.success('Successfully Created!!', {
          position: toast.POSITION.TOP_RIGHT,
          className: 'foo-bar',
        });
      } else if (event?.response?.statusText === 'Internal Server Error') {
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

    if (name.length < 4) {
      setError('name', {
        type: 'manual',
        message: 'Name must be at least 4 characters',
      });
      return;
    }

    if (!/^[a-z0-9]+$/.test(username)) {
      setError('username', {
        type: 'manual',
        message: 'Username must contain only lowercase letters and numbers',
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

    if (!expertiseSkills) {
      setError('expertiseSkills', {
        type: 'manual',
        message: 'Expertise Skills are required',
      });
      return;
    }

    if (!projectLinks) {
      setError('projectLinks', {
        type: 'manual',
        message: 'Project Links are required',
      });
      return;
    }

    if (!linkedInLink) {
      setError('linkedInLink', {
        type: 'manual',
        message: 'LinkedIn Link are required',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('imageName', imageName);
    formData.append('photo', previewImage);
    formData.append('expertiseSkills', expertiseSkills);
    formData.append('projectLinks', projectLinks);
    formData.append('linkedInLink', linkedInLink);

    const submission = {
      name: formData.get('name'),
      username: formData.get('username'),
      // email: formData.get('email'),
      password: formData.get('password'),
      imageName: formData.get('imageName'),
      photo: formData.get('photo'),
      expertiseSkills: formData.get('expertiseSkills'),
      projectLinks: formData.get('projectLinks'),
      linkedInLink: formData.get('linkedInLink'),
    };

    try {
      if (currentEmail) {
        // Update operation
        const response = await axios.put(
          `http://localhost:3333/recruiter/update-recruiter/${currentEmail}`,
          submission,
        );
        console.log('API Response:', response);

        notify('success');
      } else {
        const response = await axios.post(
          'http://localhost:3333/recruiter/create-recruiter',
          formData,
        );
        console.log('API Response:', response);

        notify('success');
      }
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

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const resizedBase64 = await resizeImage(reader.result, 100, 100); // Set your desired dimensions
          setPreviewImage(resizedBase64);
        } catch (error) {
          console.error('Error while resizing image:', error);
          setPreviewImage(null);
        }
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative rounded w-full"
        noValidate
      >
        <h1 className="text-4xl font-bold mb-4 text-blue">
          Create a Recruiter
        </h1>

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
                  placeholder="Enter recruiter's name"
                  className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                />
              )}
            />
            {errors.name && (
              <span className="text-red text-sm">{errors.name.message}</span>
            )}
          </div>

          <div className="mb-1 w-full">
            <label className="block text-sm font-bold mb-1">Username</label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Username is required',
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message:
                    'Username must contain only lowercase letters and numbers',
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter recruiter's username"
                  className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                />
              )}
            />
            {errors.username && (
              <span className="text-red text-sm">
                {errors.username.message}
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
                placeholder="Enter recruiter's email"
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
                    placeholder="Enter recruiter's password"
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
            <span className="text-red text-sm">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image Name
          </label>
          <Controller
            name="imageName"
            control={control}
            rules={{
              required: 'Image Name is required',
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter recruiter's image name"
                className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
              />
            )}
          />
          {errors.imageName && (
            <span className="text-red text-sm">{errors.imageName.message}</span>
          )}
        </div>

        <div className="flex gap-5 w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Photo
            </label>
            <Controller
              name="photo"
              control={control}
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
              Expertise Skills
            </label>
            <Controller
              name="expertiseSkills"
              control={control}
              rules={{
                required: 'Expertise Skills are required',
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter recruiter's expertise skills"
                  className="w-full px-4 h-[54px] rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
                />
              )}
            />
            {errors.expertiseSkills && (
              <span className="text-red text-sm">
                {errors.expertiseSkills.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Project Links
          </label>
          <Controller
            name="projectLinks"
            control={control}
            rules={{
              required: 'Project Links are required',
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter recruiter's project links"
                className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
              />
            )}
          />
          {errors.projectLinks && (
            <span className="text-red text-sm">
              {errors.projectLinks.message}
            </span>
          )}
        </div>

        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            LinkedIn Link
          </label>
          <Controller
            name="linkedInLink"
            control={control}
            rules={{
              required: 'LinkedIn Link is required',
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter recruiter's LinkedIn link"
                className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
              />
            )}
          />
          {errors.linkedInLink && (
            <span className="text-red text-sm">
              {errors.linkedInLink.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="border border-blue py-3 px-8 rounded-lg bg-blue hover:bg-[#3333bd99] transition-all text-white flex justify-center items-center w-fit"
          >
            {!currentEmail ? 'Create Recruiter' : 'Update Recruiter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecruiter;
