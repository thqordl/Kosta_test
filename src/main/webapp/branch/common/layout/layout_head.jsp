<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
.zl-app { min-height: 100vh; background: #f3f4f6; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 16px; color: #111827; }
.zl-sidebar { position: fixed; top: 0; left: 0; width: 256px; height: 100vh; background: #ffffff; border-right: 1px solid #e5e7eb; overflow-y: auto; z-index: 40; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04); }
.zl-brand { display: flex; align-items: center; gap: 12px; padding: 24px 20px 20px; border-bottom: 1px solid #eef2f7; }
.zl-logo { width: 40px; height: 40px; border-radius: 50%; background: #00853D; color: #fff; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }
.zl-brand-title { margin: 0; font-size: 18px; color: #111827; line-height: 1.2; }
.zl-brand-sub { margin: 2px 0 0; font-size: 12px; color: #6b7280; }
.zl-nav { padding: 14px; }
.zl-group-title { margin: 14px 6px 8px; font-size: 11px; color: #9ca3af; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
.zl-link { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #374151; font-size: 14px; padding: 10px 12px; border-radius: 10px; margin-bottom: 6px; }
.zl-link:hover { background: #f3f4f6; }
.zl-link.active { background: #00853D; color: #ffffff; font-weight: 700; }
.zl-sub-link { display: block; text-decoration: none; color: #4b5563; font-size: 13px; padding: 8px 12px 8px 24px; border-radius: 8px; margin-bottom: 4px; }
.zl-sub-link:hover { background: #f9fafb; }
.zl-sub-link.active { background: #dcfce7; color: #166534; font-weight: 700; }
.zl-content { margin-left: 256px; min-height: 100vh; }
.zl-header { position: sticky; top: 0; z-index: 30; background: #ffffff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04); }
.zl-header-inner { min-height: 72px; padding: 0 18px 0 24px; display: flex; justify-content: flex-end; align-items: center; gap: 16px; }
.zl-title { margin: 0; font-size: 18px; color: #111827; }
.zl-subtitle { margin: 4px 0 0; font-size: 12px; color: #6b7280; }
.zl-user { display: inline-flex; align-items: center; gap: 10px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 999px; padding: 6px 10px; }
.zl-user-badge { width: 28px; height: 28px; border-radius: 50%; background: #00853D; color: #fff; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
.zl-link > i,
.zl-sub-link > i,
.zl-menu-group > summary i { width: 16px; text-align: center; flex: 0 0 16px; }
.zl-menu-group { margin-bottom: 6px; }
.zl-menu-group > summary { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; color: #374151; font-size: 14px; padding: 10px 12px; border-radius: 10px; }
.zl-menu-group > summary::-webkit-details-marker { display: none; }
.zl-menu-group > summary:hover { background: #f3f4f6; }
.zl-menu-group.open > summary,
.zl-menu-group[open] > summary { background: #f3f4f6; }
.zl-menu-group > summary .zl-left { display: inline-flex; align-items: center; gap: 10px; }
.zl-menu-group > summary .zl-right { transition: transform 0.2s ease; color: #9ca3af; }
.zl-menu-group[open] > summary .zl-right { transform: rotate(90deg); }
.zl-submenu { margin: 4px 0 8px 0; }
.zl-page { padding: 22px; }
@media (max-width: 1100px) {
  .zl-sidebar { position: static; width: 100%; height: auto; border-right: none; border-bottom: 1px solid #e5e7eb; }
  .zl-content { margin-left: 0; }
}
</style>
<script>
window.__ZEROLOSS_CP = '<%= request.getContextPath() %>';
document.addEventListener('DOMContentLoaded', function () {
  var cp = window.__ZEROLOSS_CP || '';
  if (!cp) {
    return;
  }

  document.querySelectorAll('a[href^="/branch/"]').forEach(function (link) {
    link.href = cp + link.getAttribute('href');
  });

  document.querySelectorAll('form[action^="/branch/"]').forEach(function (form) {
    form.action = cp + form.getAttribute('action');
  });
});
</script>
