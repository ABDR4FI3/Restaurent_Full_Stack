class UserRole {
  final int roleId;
  final String roleName;

  UserRole({required this.roleId, required this.roleName});

  factory UserRole.fromJson(Map<String, dynamic> json) {
    return UserRole(
      roleId: json['roleId'] ?? 0,
      roleName: json['roleName'] ?? '',
    );
  }
}
