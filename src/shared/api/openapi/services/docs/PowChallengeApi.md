# PowChallengeApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createPowChallenge**](#createpowchallenge) | **POST** /pow-challenge | Create PowChallenge|

# **createPowChallenge**
> PowChallengeCreateCommandResult createPowChallenge()


### Example

```typescript
import {
    PowChallengeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PowChallengeApi(configuration);

const { status, data } = await apiInstance.createPowChallenge();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**PowChallengeCreateCommandResult**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | PowChallengeCreateCommandResult |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

