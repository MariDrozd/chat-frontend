# StatusApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**checkHealth**](#checkhealth) | **GET** /health-check | Health check|

# **checkHealth**
> CheckHealth200Response checkHealth()


### Example

```typescript
import {
    StatusApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatusApi(configuration);

const { status, data } = await apiInstance.checkHealth();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CheckHealth200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | status |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

