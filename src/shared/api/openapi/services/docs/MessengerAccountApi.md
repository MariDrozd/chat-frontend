# MessengerAccountApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMessengerAccount**](#getmessengeraccount) | **GET** /messenger-account | Get MessengerAccount|

# **getMessengerAccount**
> MessengerAccountGetQueryResult getMessengerAccount()


### Example

```typescript
import {
    MessengerAccountApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessengerAccountApi(configuration);

const { status, data } = await apiInstance.getMessengerAccount();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MessengerAccountGetQueryResult**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | MessengerAccountGetQueryResult |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

