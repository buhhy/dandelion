name := """Dandelion"""
version := "0.1.0-SNAPSHOT"
lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.8"
incOptions := incOptions.value.withNameHashing(true)
updateOptions := updateOptions.value.withCachedResolution(cachedResoluton = true)

libraryDependencies ++= Seq(
  cache,

  //tslint dependency
  "org.webjars.npm" % "tslint-eslint-rules" % "1.2.0",
  "org.webjars.npm" % "codelyzer" % "0.0.19",

  "org.webjars" %% "webjars-play" % "2.5.0"
)

dependencyOverrides ++= Set(
  "org.webjars.npm" % "minimatch" % "3.0.0",
  "org.webjars.npm" % "glob" % "7.0.3"
)

PlayKeys.playRunHooks <+= baseDirectory.map(Webpack.apply)
//PlayKeys.playRunHooks <+= baseDirectory.map(TypedCss.apply)

// use the combined tslint and eslint rules plus ng2 lint rules
(rulesDirectories in tslint) := Some(List(tslintEslintRulesDir.value, ng2LintRulesDir.value))

routesGenerator := InjectedRoutesGenerator
