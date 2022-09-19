using Microsoft.EntityFrameworkCore;
using TestTask;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMvc();
//string connection = builder.Configuration.GetConnectionString("DbConnection");
//builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));
builder.Services.AddDbContext<ApplicationContext>(options => options.UseInMemoryDatabase("contactDB"));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseDefaultFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Contact}/{action=Index}");

app.Run();
