
const excludedRoutes=
['/token',
'/',
'/subscription',
'/resetPassword'
]
const passwordSettings = {
    passwordLength: [6,7,8,9,10],
    expirationPeriod: [30,40,50,60,70,80,90],
    beforeLockOutAttempts: [6,7,8,9,10],
    lockOutPeriod: [15,30,45,60,75,90],
    characters: ['Letters','Capitals','Numbers','Special Characters']
}
module.exports={
	excludedRoutes:excludedRoutes,
    passwordSettings: passwordSettings
}