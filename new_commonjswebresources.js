function phonenumber_onchange(context)
{
    var phoneNumber = context.getEventSource();
	// Validate the field information.
    if (typeof (phoneNumber) != "undefined" && phoneNumber != null) 
	{
        if (phoneNumber.getValue() != null) 
		{
			// Remove any non-numeric characters (except for x or X) and force to lower case.
			var sTmp = phoneNumber.getValue().replace(/[^0-9|x|X]/g, "").toLowerCase();
			// If there is an extension in the number, strip off the extension
			if (sTmp.indexOf("x") != -1)
			{
				var sTmp2 = sTmp.substr(0, sTmp.indexOf("x"))
			}
			else
			{
				var sTmp2 = sTmp
			}

			// If the number has a valid length, format the number.

			switch (sTmp2.length)
			{
				case "4105551212".length:
				switch (sTmp.length)
				{
					case "4105551212".length:
						phoneNumber.setValue(sTmp.substr(0, 3) + "-" + sTmp.substr(3, 3) + "-" + sTmp.substr(6, 4));
					break;
					default:
						phoneNumber.setValue(sTmp.substr(0, 3) + "-" + sTmp.substr(3, 3) + "-" + sTmp.substr(6, 4) + " " + sTmp.substr(10));
				}
				break;

				case "5551212".length:
				switch (sTmp.length)
				{
					case "5551212".length:
						phoneNumber.setValue(sTmp.substr(0, 3) + "-" + sTmp.substr(3, 4));
					break;
					default:
						phoneNumber.setValue(sTmp.substr(0, 3) + "-" + sTmp.substr(3, 4) + " " + sTmp.substr(7));
				}
				break;
				default:
			}
		}
	}
}

function UserHasRole(roleName) 
{
    var currentUserRoles = Xrm.Page.context.getUserRoles();
    for (var i = 0; i < currentUserRoles.length; i++) 
	{
        var userRoleId = currentUserRoles[i];
		var userRoleName = GetRoleName(userRoleId);
        if (userRoleName == roleName) 
		{
            return true;
        }
    }
    return false;
}
 
function GetRoleName(roleId) 
{
	//Get Rolename based on RoleId
    //var serverUrl = Xrm.Page.context.getServerUrl();
//   var serverUrl = location.protocol + "//" + location.host + "/" + Xrm.Page.context.getOrgUniqueName();
//  fullpage to new is:  https://coradixdemo.api.crm.dynamics.com/XRMServices/2011/OrganizationData.svc
   var serverUrl = location.protocol + "//" + location.host ;
   var odataSelect = serverUrl + "/XRMServices/2011/OrganizationData.svc" + "/" + "RoleSet?$filter=RoleId eq guid'" + roleId + "'";
    var roleName = null;

    $.ajax(
        {
            type: "GET",
            async: false,
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: odataSelect,
            beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader("Accept", "application/json"); },
            success: function (data, textStatus, XmlHttpRequest) {
                roleName = data.d.results[0].Name;
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) { alert('OData Select Failed: ' + textStatus + errorThrown + odataSelect); }
        }
    );
    return roleName;
}

function isFunction(a)
{
	return typeof a == 'function';
}

function isObject(a)
{
	return (typeof a == 'object' && !!a) || isFunction(a);
}

function isNull(a)
{
	return typeof a == 'object' && !a;
}

