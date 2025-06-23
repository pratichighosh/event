import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  FileText, 
  Star, 
  Upload, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { artistCategories, languages, experienceLevels, priceRanges, locations } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import { useAppContext } from '../../App';
import { cn } from '../../utils/cn';

// Validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup.string().required('Phone number is required'),
  bio: yup.string().required('Bio is required').min(50, 'Bio must be at least 50 characters'),
  categories: yup.array().min(1, 'Select at least one category'),
  languages: yup.array().min(1, 'Select at least one language'),
  experience: yup.string().required('Experience level is required'),
  priceRange: yup.string().required('Price range is required'),
  location: yup.string().required('Location is required'),
  skills: yup.string().required('Skills are required'),
  website: yup.string().url('Invalid URL format').nullable(),
  instagram: yup.string().nullable(),
  portfolio: yup.string().url('Invalid URL format').nullable()
});

const ArtistOnboardingForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { addNotification } = useAppContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      categories: [],
      languages: [],
      skills: '',
      bio: '',
      name: '',
      email: '',
      phone: '',
      location: '',
      experience: '',
      priceRange: '',
      website: '',
      instagram: '',
      portfolio: ''
    }
  });

  const watchedValues = watch();

  const steps = [
    {
      id: 0,
      title: 'Personal Information',
      icon: User,
      description: 'Tell us about yourself',
      fields: ['name', 'email', 'phone', 'location']
    },
    {
      id: 1,
      title: 'Professional Details',
      icon: Star,
      description: 'Your artistic background',
      fields: ['categories', 'experience', 'priceRange', 'skills']
    },
    {
      id: 2,
      title: 'Profile & Portfolio',
      icon: FileText,
      description: 'Showcase your work',
      fields: ['bio', 'languages', 'website', 'instagram', 'portfolio']
    },
    {
      id: 3,
      title: 'Profile Image',
      icon: Upload,
      description: 'Add your profile photo',
      fields: []
    }
  ];

  const categoryOptions = artistCategories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));

  const languageOptions = languages.map(lang => ({
    value: lang,
    label: lang
  }));

  const locationOptions = locations.slice(0, 50).map(loc => ({
    value: loc,
    label: loc
  }));

  const handleNext = async () => {
    const currentFields = steps[currentStep].fields;
    if (currentFields.length > 0) {
      const isValid = await trigger(currentFields);
      if (!isValid) {
        addNotification({
          type: 'error',
          message: 'Please fill in all required fields correctly'
        });
        return;
      }
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        profileImage,
        submittedAt: new Date().toISOString()
      };
      
      await onSubmit(formData);
      addNotification({
        type: 'success',
        message: 'Application submitted successfully!',
        description: 'We will review your application and get back to you within 48 hours.'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Submission failed',
        description: 'Please try again or contact support if the issue persists.'
      });
    }
  };

  const getStepProgress = () => {
    const currentFields = steps[currentStep].fields;
    if (currentFields.length === 0) return 100;
    
    const completedFields = currentFields.filter(field => {
      const value = watchedValues[field];
      return value && (Array.isArray(value) ? value.length > 0 : value.toString().trim() !== '');
    });
    
    return (completedFields.length / currentFields.length) * 100;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name *"
                placeholder="Enter your full name"
                {...register('name')}
                error={errors.name?.message}
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="your.email@example.com"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number *"
                placeholder="+1 (555) 123-4567"
                {...register('phone')}
                error={errors.phone?.message}
              />
              <Select
                label="Location *"
                options={locationOptions}
                value={watchedValues.location}
                onChange={(value) => setValue('location', value)}
                placeholder="Select your city"
                error={errors.location?.message}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                Categories * (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categoryOptions.map((category) => (
                  <Checkbox
                    key={category.value}
                    label={category.label}
                    checked={watchedValues.categories?.includes(category.value)}
                    onChange={(checked) => {
                      const current = watchedValues.categories || [];
                      const updated = checked
                        ? [...current, category.value]
                        : current.filter(c => c !== category.value);
                      setValue('categories', updated);
                    }}
                  />
                ))}
              </div>
              {errors.categories && (
                <p className="text-sm text-red-600 mt-2">{errors.categories.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Experience Level *"
                options={experienceLevels}
                value={watchedValues.experience}
                onChange={(value) => setValue('experience', value)}
                placeholder="Select experience level"
                error={errors.experience?.message}
              />
              <Select
                label="Price Range *"
                options={priceRanges.filter(p => p.value !== 'all')}
                value={watchedValues.priceRange}
                onChange={(value) => setValue('priceRange', value)}
                placeholder="Select price range"
                error={errors.priceRange?.message}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Skills & Specialties *
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                rows={3}
                placeholder="List your skills, specialties, and what makes you unique (e.g., Jazz vocals, Hip-hop choreography, Stand-up comedy)"
                {...register('skills')}
              />
              {errors.skills && (
                <p className="text-sm text-red-600 mt-1">{errors.skills.message}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Professional Bio *
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                rows={4}
                placeholder="Tell us about your background, experience, and what makes you unique as an artist..."
                {...register('bio')}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.bio && (
                  <p className="text-sm text-red-600">{errors.bio.message}</p>
                )}
                <p className="text-sm text-gray-500 ml-auto">
                  {watchedValues.bio?.length || 0}/500 characters
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                Languages Spoken * (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-40 overflow-y-auto p-3 border rounded-lg">
                {languageOptions.slice(0, 20).map((language) => (
                  <Checkbox
                    key={language.value}
                    label={language.label}
                    checked={watchedValues.languages?.includes(language.value)}
                    onChange={(checked) => {
                      const current = watchedValues.languages || [];
                      const updated = checked
                        ? [...current, language.value]
                        : current.filter(l => l !== language.value);
                      setValue('languages', updated);
                    }}
                  />
                ))}
              </div>
              {errors.languages && (
                <p className="text-sm text-red-600 mt-2">{errors.languages.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Website"
                placeholder="https://yourwebsite.com"
                {...register('website')}
                error={errors.website?.message}
              />
              <Input
                label="Instagram"
                placeholder="@yourusername"
                {...register('instagram')}
                error={errors.instagram?.message}
              />
              <Input
                label="Portfolio URL"
                placeholder="https://portfolio.com"
                {...register('portfolio')}
                error={errors.portfolio?.message}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
              
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button variant="outline" className="mb-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </label>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload a professional photo (JPG, PNG, max 5MB)
              </p>
            </div>

            {profileImage && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 dark:text-green-200">
                    Photo uploaded successfully!
                  </span>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold gradient-text">
          Join Artistly
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          Create your artist profile and start getting bookings
        </p>
      </CardHeader>

      <CardContent className="p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                    isActive && "bg-primary-600 border-primary-600 text-white",
                    isCompleted && "bg-green-600 border-green-600 text-white",
                    !isActive && !isCompleted && "border-gray-300 text-gray-400"
                  )}>
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 font-medium text-center max-w-20",
                    isActive && "text-primary-600",
                    isCompleted && "text-green-600",
                    !isActive && !isCompleted && "text-gray-400"
                  )}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + getStepProgress() / 100) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Step Content */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {steps[currentStep].description}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="gradient"
                loading={isSubmitting}
                icon={<Check className="w-4 h-4" />}
              >
                Submit Application
              </Button>
            ) : (
              <Button
                type="button"
                variant="gradient"
                onClick={handleNext}
                icon={<ChevronRight className="w-4 h-4" />}
              >
                Next
              </Button>
            )}
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">Application Review Process</p>
              <p>
                All applications are reviewed within 48 hours. We verify your credentials 
                and may reach out for additional information. Once approved, you'll receive 
                access to our artist dashboard.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistOnboardingForm;