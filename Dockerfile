# Stage 1: Build the application (Uses the full SDK)
# Base Image: Official .NET SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies first. 
# This leverages Docker layer caching for faster subsequent builds.
COPY ["workgdmt.Server/workgdmt.Server.csproj", "workgdmt.Server/"]
RUN dotnet restore "workgdmt.Server/workgdmt.Server.csproj"

# Copy the rest of the source code
COPY . .
WORKDIR "/src/workgdmt.Server"

# Publish the application for release
RUN dotnet publish "workgdmt.Server.csproj" -c Release -o /app/publish --no-restore

# Stage 2: Create the final production image (Uses only the smaller Runtime)
# Base Image: Official ASP.NET Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy the published application files from the 'build' stage
COPY --from=build /app/publish .

EXPOSE 8080

# Define the entry point to run the application (the compiled DLL)
ENTRYPOINT ["dotnet", "workgdmt.Server.dll"]