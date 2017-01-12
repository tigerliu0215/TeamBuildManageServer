/** Created by CUIJA on 01-06-2017.*/

var acl = require('acl');

acl = new acl(new acl.memoryBackend());


module.exports.invokeRolesPolicies = invokeRolesPolicies;
module.exports.isAllowed = isAllowed;


function invokeRolesPolicies() {
  acl.allow([
    {
      roles: ['admin'],
      allows: [
        {
          resources: '/api/activities',
          permissions: ['*']
        },
        {
          resources: '/api/activities/:activityId',
          permissions: ['*']
        },
        {
          resources: '/api/attachments/upload',
          permissions: ['*']
        }
      ]
    },
    {
      roles: ['user'],
      allows: [
        {
          resources: '/api/activities',
          permissions: ['get']
        },
        {
          resources: '/api/activities/:activityId',
          permissions: ['get']
        },
        {
          resources: '/api/activities/comments/publish/:activityId',
          permissions: ['post']
        },
        {
          resources: '/api/activities/action/collect/:activityId',
          permissions: ['get']
        },
        {
          resources: '/api/activities/action/like/:activityId',
          permissions: ['get']
        },
        {
          resources: '/api/activities/action/vote/:activityId/:votingIndex',
          permissions: ['post']  //should contains actId,voteSequence,optionSequence
        }
      ]
    },
    {
      roles: ['guest'],
      allows: [
        {
          resources: '/api/activities',
          permissions: ['get']
        },
        {
          resources: '/api/activities/:activityId',
          permissions: ['get']
        }
      ]
    }
  ]);
}

function isAllowed(req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLocaleLowerCase(), function (error, isAllowed) {
    if (error) {
      return res.status(500).send('Unexpected authorization error');
    }
    else {
      if (isAllowed) {
        return next();
      }
      else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });

}

