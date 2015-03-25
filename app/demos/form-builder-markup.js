angular.module('formForDocumentation').controller('FormBuilderMarkupDemoController',
  function($scope, flashr) {

    // Form inputs will write values to this object
    $scope.formData = {};

    // This object defines the shape of your data (validation rules)
    // As well as the presentational rules (view schema)
    $scope.schema = {
      email: {
        inputType: 'text',
        label: 'Email',
        required: true,
        type: 'email'
      },
      password: {
        inputType: 'password',
        label: 'Password',
        minlength: 6,
        pattern: {
          rule: /[0-9]/,
          message: 'Your password must contain at least 1 number'
        }
      },
      gender: {
        inputType: 'radio',
        label: 'Gender',
        required: true,
        values: ['Female', 'Male']
      },
      referralSource: {
        allowBlank: true,
        inputType: 'select',
        label: 'How did you hear about us?',
        required: true,
        values: [
          {label: 'Search engine', value: 1},
          {label: 'Forum', value: 2},
          {label: 'Friend', value: 3},
          {label: 'Other', value: 4}
        ]
      },
      tos: {
        inputType: 'checkbox',
        label: 'I agree to the terms of service',
        required: true,
        custom: {
          rule: function(value) {
            return !!value;
          },
          message: 'You must agree to the terms of service'
        }
      }
    };

    // Custom submit function triggered only when a valid form is submitted
    $scope.submit = function() {
      flashr.now.success('Your form has been submitted');
    };
  });
