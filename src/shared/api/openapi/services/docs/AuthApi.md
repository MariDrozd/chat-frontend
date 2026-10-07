# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**login**](#login) | **POST** /login | Login|
|[**logout**](#logout) | **POST** /logout | Logout|
|[**logoutAll**](#logoutall) | **POST** /logout-all | Logout from all devices|
|[**refresh**](#refresh) | **POST** /refresh | Refresh|

# **login**
> UserLoginCommandResult login(userLoginCommand)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserLoginCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userLoginCommand: UserLoginCommand; //UserLoginCommand

const { status, data } = await apiInstance.login(
    userLoginCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLoginCommand** | **UserLoginCommand**| UserLoginCommand | |


### Return type

**UserLoginCommandResult**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | UserLoginCommandResult |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **logout**
> object logout(userLogoutCommand)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserLogoutCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userLogoutCommand: UserLogoutCommand; //UserLogoutCommand

const { status, data } = await apiInstance.logout(
    userLogoutCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLogoutCommand** | **UserLogoutCommand**| UserLogoutCommand | |


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | UserLogoutCommandResult |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **logoutAll**
> object logoutAll(userLogoutAllCommand)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserLogoutAllCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userLogoutAllCommand: UserLogoutAllCommand; //UserLogoutAllCommand

const { status, data } = await apiInstance.logoutAll(
    userLogoutAllCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLogoutAllCommand** | **UserLogoutAllCommand**| UserLogoutAllCommand | |


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | UserLogoutAllCommandResult |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **refresh**
> UserRefreshCommandResult refresh(userRefreshCommand)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserRefreshCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userRefreshCommand: UserRefreshCommand; //UserRefreshCommand

const { status, data } = await apiInstance.refresh(
    userRefreshCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userRefreshCommand** | **UserRefreshCommand**| UserRefreshCommand | |


### Return type

**UserRefreshCommandResult**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | UserRefreshCommandResult |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

