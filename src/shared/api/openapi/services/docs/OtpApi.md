# OtpApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createOtp**](#createotp) | **POST** /otp | Create OTP|

# **createOtp**
> OtpCreateCommandResult createOtp(otpCreateCommand)


### Example

```typescript
import {
    OtpApi,
    Configuration,
    OtpCreateCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new OtpApi(configuration);

let otpCreateCommand: OtpCreateCommand; //OtpCreateCommand

const { status, data } = await apiInstance.createOtp(
    otpCreateCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **otpCreateCommand** | **OtpCreateCommand**| OtpCreateCommand | |


### Return type

**OtpCreateCommandResult**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**202** | OtpCreateCommandResult |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

