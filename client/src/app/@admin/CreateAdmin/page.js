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

const CreateAdmin = ({ currentEmail }) => {
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
      username,
      email,
      password,
      nationalId,
      photo,
      role,
      permissions,
    } = data;

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

    if (nationalId.length !== 10) {
      setError('nationalId', {
        type: 'manual',
        message: 'Invalid National ID',
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

    if (!role) {
      setError('role', { type: 'manual', message: 'Role is required' });
      return;
    }

    if (permissions.length < 2) {
      setError('permissions', {
        type: 'manual',
        message: 'Select at least 2 permissions',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('nationalId', data.nationalId);
    data.photo = previewImage;
    formData.append('photo', previewImage);
    data.imageName = fileStore;
    if (fileStore) {
      formData.append('imageName', fileStore);
    }

    // Append role and permissions as needed
    formData.append('role', data.role);
    data.permissions.forEach((permission) => {
      formData.append('permissions', permission);
    });

    const submission = {
      name: formData.get('name'),
      username: formData.get('username'),
      // email: formData.get('email'),
      password: formData.get('password'),
      nationalId: formData.get('nationalId'),
      photo: formData.get('photo'),
      imageName: formData.get('imageName'),
      role: formData.get('role'),
      permissions: Array.from(formData.getAll('permissions')),
    };

    try {
      if (currentEmail) {
        // Update operation
        const response = await axios.put(
          `http://localhost:3333/admin/update-admin/${currentEmail}`,
          submission,
        );
        console.log('API Response:', response);

        notify('success');
      } else {
        console.log({ formData });
        const response = await axios.post(
          'http://localhost:3333/admin/create-admin',
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

  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setPreviewImage(reader.result);
  //     };

  //     reader.readAsDataURL(file);
  //   } else {
  //     setPreviewImage(null);
  //   }
  // };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative rounded w-full"
        noValidate
      >
        <h1 className="text-4xl font-bold mb-4 text-blue">Create a Admin</h1>

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
                  placeholder="Enter your username"
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
              // pattern: {
              //   value: /^[a-zA-Z0-9._-]+@deveteam\.admin\.com$/,
              //   message: 'Invalid email address',
              // },
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
            <span className="text-red text-sm">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            National ID
          </label>
          <Controller
            name="nationalId"
            control={control}
            rules={{
              required: 'National ID is required',
              pattern: { value: /^[0-9]{10}$/, message: 'Invalid National ID' },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your National ID"
                className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
              />
            )}
          />
          {errors.nationalId && (
            <span className="text-red text-sm">
              {errors.nationalId.message}
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

        <div className="flex gap-10">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Role</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  value="executive"
                  {...register('role', { required: 'Role is required' })}
                />{' '}
                Executive
              </label>
              <label>
                <input
                  type="radio"
                  value="moderator"
                  {...register('role', { required: 'Role is required' })}
                />{' '}
                Moderator
              </label>
            </div>
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Permissions
            </label>
            <div>
              <label className="mr-4">
                <input
                  type="checkbox"
                  {...register('permissions')}
                  value="creating"
                />{' '}
                Creating
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  {...register('permissions')}
                  value="adding"
                />{' '}
                Adding
              </label>
              <label>
                <input
                  type="checkbox"
                  {...register('permissions')}
                  value="deleting"
                />{' '}
                Deleting
              </label>
            </div>
            {errors.permissions && (
              <span className="text-red-500 text-sm">
                {errors.permissions.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="border border-blue py-3 px-8 rounded-lg bg-blue hover:bg-[#3333bd99] transition-all text-white flex justify-center items-center w-fit"
          >
            {!currentEmail ? 'Create Admin' : 'Update Admin'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;
